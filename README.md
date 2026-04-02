# Web Development Project 5 - *RecipeFinder*

Submitted by: **Gabriel Restrepo**

This web app: **RecipeFinder is a dynamic dashboard that allows users to search, filter, and explore recipes using the Spoonacular API. Users can browse recipes, apply multiple filters, view key statistics, and interact with recipe cards that flip to reveal more details.**

Time spent: **20** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
  - Total number of recipes loaded
  - Average cooking time
  - Number of vegetarian recipes
  - Top cuisine category
  - Average health score
- [x] **A search bar allows the user to search for an item in the fetched data**
  - Filters recipes by title
  - Updates dynamically as the user types
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - Filters by cuisine, dish type, and diet
  - Uses different attributes than the search bar
  - Updates results dynamically on selection

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [ ] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] Flip card interaction to reveal detailed recipe information
* [x] Local search filtering without additional API calls
* [x] Loading state and error handling UI
* [x] Responsive UI design
* [x] External link to full recipe source

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://i.imgur.com/bnJURiD.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/)

## Notes

Some challenges encountered while building the app:

- Managing multiple filters and ensuring correct API queries
- Handling inconsistent API data (missing fields like cuisines or healthScore)
- Designing the flip card interaction while maintaining accessibility and UX
- Optimizing performance using `useMemo` for derived state

## License

    Copyright [2026] [Gabriel Restrepo]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
