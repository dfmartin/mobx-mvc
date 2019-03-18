# mobx-mvc
example of using [mobx](https://github.com/mobxjs/mobx) stores as controllers for a React app.

    yarn install
    yarn start

Once the app is running you will see a number of buttons.  Each one pushes a URL using [history from ReactTraining](https://github.com/ReactTraining/history).

> side note.  This demo makes use of [react Hooks](https://reactjs.org/docs/hooks-intro.html). Including for the stores.  No need for inject HOC from mobx.

## why?
An app that runs off of the URL can be difficult to manage.  Who sets the URL?  Who interpets the URL?  When does any of that take place?

The goal of this demo is to present an example of an application that manages all state and navigation via mobx stores.
1. Let the store receive the URL
2. parse it
3. load data based on URL
4. determine the correct view
5. update the UI

Also wanted to make it work with multiple stores.

## how?
At a high level:
### the stores
* three stores - root, lead store, job store
* root store listens to `history.listen`.  It uses the first part of the URL to determine which child store will be used.  It then calls `activate(location)` on the appropriate child store.
* child store proceeds to use the rest of the URL to determine which child view to use.  It also loads any data that view will need.
* the root has a property `currentView` which returns a `ReactNode` from the child `activate` call.
* the child store also exposes a property `currentView` which returns any child view.
* the child store will return its `<Container />` from the the `activate` call.  This will be used by the root store.
* I supposed this pattern could be followed down multiple levels of stores.

### the views
* `App.tsx` is the shell and uses the root store's `currentView` as the base content.
* `<Container />` will access the store's `currentView` property to show the child views.
* `_childView_.tsx` will access the store for its data.

## about the demo
* written in TypeScript
* messy code - for now
* simulates a 2 second load time for each url along with an abort.  The goal here was to make sure the UI did not block and that multiple URLs could be pushed in rapid succession.
* the URL has the following patterns:
  * `/jobs` - jobs search
  * `/jobs/:jobId` - job details for jobId
  * `/leads` - lead search
  * `/leads/:leadId' - lead details for leadId
  * `/leads/:leadId/:jobId` - lead details for leadId along with some details about jobId.  There will be a button to take you to `/jobs/:jobId`

At this point there is no actual data behind the scenes. This means you can use any ids in the URL.

##  extras
### hooks
I created a hook to access mobx stores.  Right now it is rather specific to this project.  It is used like:

```ts
const jobStore = useStore('jobStore')
```
this return a typed store and the `useStore` constrains the argument passed to ensure it is a valid store.  E.g. you cannot call `useStore('someRandomString')`

I liberally copied some observer code from the [mobx-lite project](https://github.com/mobxjs/mobx-react-lite).  I wanted dependencies only on traditional mobx and mobx-react packages.

## future
* isBusy functionality
* route matching/parsing e.g `/leads/:leadId/jobs/:jobId` or perhaps `/leads/{leadId}/jobs/{jobId}`
* I would like to create some data/services and hook it up to be retrieved in the stores.  I don't have a desire at this time to make actual `fetch` calls.
* some styling.  Likely from [material-ui](https://material-ui.com/)

