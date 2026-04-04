# Commuter House Search

**Status**: Idea (Backlog)
**Category**: Real Estate Utility
**Platform**: Web (Geospatial)

## Concept
The "Skyscanner for Houses." A real estate search engine that prioritizes commute time over physical distance.

## Context
- **Problem**: Traditional property portals allow searching by "radius" (e.g., 5 miles from X). However, a house 5 miles away might have a longer commute than one 15 miles away due to transport links.
- **Disruptive Potential**: Challenges the way people currently filter their future homes by placing the user's daily reality (the commute) at the center of the search.

## Core Features
1. **Commute-Based Filtering**: Search for properties within "30 minutes of London Bridge by train" or "20 minutes drive from X."
2. **Multi-Model Support**: Factor in walking, cycling, driving, and public transport.
3. **Transit Overlays**: Visualize property locations against heatmaps of commute durations.
4. **Market Comparison**: Standard property data (beds, price) filtered through the lens of time-wealth.

## Technical Goals
- **API Integration**: Heavy usage of transit APIs (TfL, Google Maps, Citymapper) and property data aggregators.
- **Geospatial Processing**: Efficiently mapping property coordinates against isochrones (time-distance polygons).
