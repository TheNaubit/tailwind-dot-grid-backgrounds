## Contribute

Contributions of any kind (pull requests, bug reports, feature requests, documentation, design) are more than welcome! If you like this project and want to help, but feel like you are stuck, feel free to contact the maintainer.

### Branches

- `main`: the latest major (`2.x`, Tailwind CSS v4, pure CSS).
- `v1`: the maintenance line (`1.x`, Tailwind CSS v3, JavaScript plugin). Open fixes for Tailwind CSS v3 against this branch.

Releases are automated with [semantic-release](https://semantic-release.gitbook.io/): every push to `main` or `v1` runs `.github/workflows/release.yml`, which computes the version from the [Conventional Commits](https://www.conventionalcommits.org/) messages, updates `CHANGELOG.md`, tags, creates the GitHub release and publishes to npm with [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC, in the `npm` environment). It only needs the built-in `GITHUB_TOKEN`. Releases from `v1` are published under the `release-v1` npm dist-tag.

### Building from source

Building the project should be quick and easy. If it isn't, it's the maintainer's fault. Please report any problems with building in a GitHub issue.

You need Node.js `>=22.12.0` (the version in `.nvmrc` is recommended, run `nvm use`) and npm `>=10.9.0`.

First, clone the git repository:

```
git clone git@github.com:TheNaubit/tailwind-dot-grid-backgrounds.git
```

Then switch to the newly created tailwind-dot-grid-backgrounds directory and install the dependencies:

```
cd tailwind-dot-grid-backgrounds
npm install
```

You can then run the static analysis, the type check and the unit tests to verify that everything works correctly:

```
npm run lint
npm run typecheck
npm run test:run
```

And finally, build the library:

```
npm run build
```

The output will appear in the `dist` directory.

### Commits

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) format (`feat: ...`, `fix: ...`, `docs: ...`); a git hook checks them. Another git hook runs the linter, the type check and the tests before each commit.

Happy hacking!
