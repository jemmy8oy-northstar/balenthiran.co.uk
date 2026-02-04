#!/bin/bash
set -e 

# --- Configuration ---
REGION="LHR"
NAMESPACE="lr7uc6l49odc"
REPO_NAME="balenthiran"
COMPARTMENT_ID="ocid1.tenancy.oc1..aaaaaaaazzb6zpefjmtxcgbr2ws5xtd265wa7o47o6j2bjkgznynazqhwmxa"
REPO_URL="$REGION.ocir.io/$NAMESPACE/$REPO_NAME"

KUBERNETES_NAMESPACE="balenthiran"
KUBERNETES_DEPLOYMENT="balenthiran-balenthiranhelm-main"

# 1. Checking deployment status
echo "⚡️ Checking deployment status..."
kubectl rollout status deploy $KUBERNETES_DEPLOYMENT -n $KUBERNETES_NAMESPACE

# 2. Prepare Versioning
TAG=$(git rev-parse --short HEAD)
echo "🚀 Starting Deployment for version: $TAG"

# 3. Build and Push
echo "🏗️  Building ARM64 Docker image..."
docker buildx build \
    --platform linux/arm64 \
    -t $REPO_URL:$TAG \
    -t $REPO_URL:latest \
    --push frontend/

# 4. Verify the upload and get the Timestamp
echo "🔍 Verifying registry and fetching timestamp..."
# Added a tiny sleep to ensure OCI indexing is finished
sleep 3

TARGET_TIME=$(oci artifacts container image list \
    --compartment-id $COMPARTMENT_ID \
    --repository-name $REPO_NAME \
    --image-version $TAG \
    --query "data.items[0].\"time-created\"" --raw-output)

echo "🕒 Newest image at: $TARGET_TIME"

# We take the timestamp (2026-02-02T17:50:00...) and 
# just grab the first 16 characters (2026-02-02T17:50)
# This creates a "Safety Zone" for the entire current minute.
BUFFER_TIME=$(echo "$TARGET_TIME" | cut -c 1-16)

echo "🛡️  Safety buffer (Minute-level): $BUFFER_TIME"

# 5. Cleanup (The "Purge" phase)
echo "🧹 Purging artifacts created BEFORE $BUFFER_TIME..."

# We use the 'starts_with' logic to protect the current minute's builds
OLD_IMAGE_IDS=$(oci artifacts container image list \
    --compartment-id "$COMPARTMENT_ID" \
    --repository-name "$REPO_NAME" \
    --query "data.items[? !starts_with(\"time-created\", '$BUFFER_TIME') && \"time-created\" < '$TARGET_TIME'].id" \
    --raw-output | tr -d '[]," ' | sort -u)
if [ -n "$OLD_IMAGE_IDS" ] && [ "$OLD_IMAGE_IDS" != "None" ]; then
    for ID in $OLD_IMAGE_IDS; do
        echo "🗑️ Deleting legacy artifact: $ID"
        # We add '|| true' because OCI might auto-delete child manifests when the parent dies
        oci artifacts container image delete --image-id $ID --force || true
    done
else
    echo "✅ Registry is already clean."
fi

# 6. Done
echo "✅ Success! Version $TAG is live. Restarting the deployment..."
kubectl rollout restart deploy $KUBERNETES_DEPLOYMENT -n $KUBERNETES_NAMESPACE