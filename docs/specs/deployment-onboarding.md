# Full-Stack Deployment & Onboarding Guide 🚀

This guide covers everything you need to know to get your .NET backend and React frontend running in Production (OKE).

## 1. Secrets Management 🔐

The backend requires a connection to your PostgreSQL database. This is managed via a Kubernetes Secret.

**Required Secret:**
- **Name:** `balenthiran-secrets`
- **Namespace:** `balenthiran`
- **Key:** `DATABASE_URL`
- **Format:** `Host=my-db-host;Database=tenbeerplan;Username=my-user;Password=my-password`

> [!NOTE]
> .NET uses a semicolon-separated Key-Value format for connection strings, unlike the `postgres://user:pass@host/db` URI format common in Python or Node.js.

**How to create it:**
```bash
kubectl create secret generic balenthiran-secrets \
  --from-literal=DATABASE_URL="Host=1.2.3.4;Database=tenbeerplan;Username=balenthiran;Password=my-secret-pw" \
  -n balenthiran
```

## 2. Database Migrations 🏗️

The application is now configured to **automatically perform migrations on startup**.

- **Workflow:** When you deploy or restart the backend pod, it checks if the database schema matches the code. If not, it applies any pending migrations before starting the web server.
- **Manual Check:** If you ever want to see what migrations are pending or apply them manually from your local machine, you can run:
  ```bash
  dotnet ef database update --project backend/Balenthiran.Database --startup-project backend/Balenthiran.WebApi
  ```

## 3. Creating the Database 🗄️

If you are starting with a fresh Postgres instance:
1. Ensure the Postgres server is accessible from your OKE cluster.
2. Create the database named `tenbeerplan` (or whatever you specified in your connection string).
3. The app's automatic migration will handle creating all tables and seeding initial data (like the interest registration categories).

## 4. Deployment Workflow 🚢

Since we are using the `latest` tag simplified workflow:

1. **Build & Push:** Run your updated `deploy.sh`. This builds both the frontend and backend, pushes them to OCIR, and triggers the restarts.
   ```bash
   ./deploy.sh
   ```

2. **Verify Pods:**
   ```bash
   kubectl get pods -n balenthiran
   ```

3. **Check Logs (if troubleshooting):**
   ```bash
   kubectl logs -f deployment/balenthiran-balenthiranhelm-backend -n balenthiran
   ```

## 5. Local Development vs. Production

- **Local:** Uses `appsettings.Development.json` and typically a local Postgres instance (e.g., `localhost:5432`).
- **Production:** Injected values from `helm/values.yaml` and Kubernetes secrets override local settings.

---

**That's it!** Your app is now a self-healing, auto-migrating machine. 🏁🚀🛡️
