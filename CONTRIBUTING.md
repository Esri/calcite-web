# Contributing to Calcite web

You want to contribute? Nice! Below are some guidelines for ensuring that your contribution makes sense for everybody.

## Reporting Issues

Found a problem? Want a new feature?

- See if your issue or idea has [already been reported](issues).
- Provide detailed reproduction instructions as well as what behavior is expected.

## Submitting Pull Requests

Pull requests are the greatest contributions, so be sure they are focused in scope.

1. To begin, [fork this project](fork), clone your fork, and add our upstream.
```bash
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-user>/calcite-web
# Navigate to the newly cloned directory
cd calcite-web
# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/esri/calcite-web
# Install the tools necessary for development
npm install
```

2. Create a branch for your feature or fix:
```bash
# Move into a new branch for a feature
git checkout -b feature/thing
```
```bash
# Move into a new branch for a fix
git checkout -b fix/something
```

3. Start up a local development server:
```bash
# Use the start script to run the default dev environment
npm start
```

4. Be sure your code follows our practices.
```bash
# Test current code
npm run test
```

5. Push your branch up to your fork:
```bash
# Push a feature branch
git push origin feature/thing
```
```bash
# Push a fix branch
git push origin fix/something
```

6. Now [open a pull request](https://help.github.com/articles/using-pull-requests/) with a clear title and description.

## Adding a Component

Adding a component to Calcite Web requires a few steps:

1. In `docs/source/documentation/components/` add a markdown file titled `_[your component name].md` which describes your component.
2. In `docs/source/documentation/components/sample-code/` add an html file containing the markup for your component. Title it `_[your component name].html`.
3. Add an entry in the components section of `docs/source/table_of_contents.yml` formatted like this:
```
        - title: 'Tooltips' # Human readable headline
          link: tooltips    # Name used for .md and .html files
          status: ['complete','inprogress','proposed','unplanned',false] # this will set the component status, false will hide from status table
          hidden: [true] # set 'hidden: true' to hide components from appearing in documentation. Useful for showing in progress components on the status table
          modifiers:        # List of modifier classes. If a component consists solely of the base with no modifiers, set 'modifiers: false' in order to display the component
            - tooltip-left
            - tooltip-right
            - tooltip-top
          doc_classes:
            - example-modifier-class # Accepts a list of class names for styling documentation examples
```
4. Run a local server (`npm start`) and develop your component
5. Add an entry in the `CHANGELOG` describing your new component.
6. Open a pull request!

## Bumping the Version

1. Change the version number in `package.json` to the desired version number.
2. Write a description of the changes, additions, and bug fixes in `CHANGELOG.md`.
3. Run `npm run dist` to make sure the dist files are updated.
4. Make sure `Esri/calcite-web` is up-to-date with your changes (via Pull Request).
5. Run `npm run release`. If prompted enter your GitHub credentials and your s3 access key/secret.

# Updating the Documentation Site

To update the documentation site, just make sure you have push access to the `Esri/calcite-web` repo and type `npm run deploy`. This will build the site and deploy to gh-pages.

The site should be updated at http://esri.github.io/calcite-web/ in just a few moments.
