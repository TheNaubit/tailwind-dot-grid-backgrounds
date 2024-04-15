## Contribute

Contributions of any kind (pull requests, bug reports, feature requests, documentation, design) are more than welcome! If you like this project and want to help, but feel like you are stuck, feel free to contact the maintainer.

### Building from source

Building the project should be quick and easy. If it isn't, it's the maintainer's fault. Please report any problems with building in a GitHub issue.

You need to have a reasonably recent version of node.js to build *tailwind-dot-grid-backgrounds*. My node version is 18.0.0 and npm version 8.6.0.

First, clone the git repository:

```
git clone git@github.com:TheNaubit/tailwind-dot-grid-backgrounds.git
```

Then switch to the newly created tailwind-dot-grid-backgrounds directory and install the dependencies:

```
cd tailwind-dot-grid-backgrounds
npm install
```

You can then run the unit tests to verify that everything works correctly:

```
npm run test:run
```

And finally, build the library:

```
npm run build
```

The output will appear in the `dist` directory.

Happy hacking!