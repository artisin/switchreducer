
const defaultAnswers = {
  warning: true,
  authorName: 'Joe',
  NPMorYARN: ['yarn'],
  libraryName: 'project-name',
  gitUSERNAME: 'user',
  gitPROJECTNAME: 'project-name',
  libraryDescription: 'A build script',
  target: ['node', 'web', 'webMin'],
  babelNodeTarget: '4',
  nvmrc: '8.5.0',
  readme: true,
  tests: true,
  bumpedrc: true,
  commitizen: true,
  zappr: true,
  editorconfig: true,
  eslintrc: true,
  gitattributes: true,
  gitignore: true,
  npmignore: true,
  changelog: true,
  wercker: true,
  git: false,
  removeSelf: false
};


const merge = function(src, target) {
  return Object.assign({}, src, target);
};

const noBuildWarning = merge(defaultAnswers, {
  warning: false,
  test: 'Should not build assets'
});

const defaultBuild = merge(defaultAnswers, {
  test: 'Should build basic answers'
});

const npmBuild = merge(defaultAnswers, {
  test: 'Should build npm pkg manager',
  NPMorYARN: ['npm'],
});

const webTargetBuild = merge(defaultAnswers, {
  test: 'Should build for web target -> {name}.js + {name}.min.js',
  target: ['web', 'webMin'],
});

const node8TargetBuild = merge(defaultAnswers, {
  test: 'Should build for node 8.5.0',
  target: ['node'],
  babelNodeTarget: '8.5.0',
  nvmrc: '8.5.0',
});


const nameChangeBuild = merge(defaultAnswers, {
  test: 'Should build with new author, git, description, and library name',
  authorName: 'yu yu hakusho',
  gitUSERNAME: 'yu-yu-hakusho',
  gitPROJECTNAME: 'yu-yu-hakusho',
  libraryDescription: 'The best stuff in town',
  libraryName: 'spirit-gun',
});

const omitAllRootFiles = merge(defaultAnswers, {
  test: 'Should omit all root files',
  readme: false,
  tests: false,
  bumpedrc: false,
  commitizen: false,
  zappr: false,
  editorconfig: false,
  eslintrc: false,
  gitattributes: false,
  gitignore: false,
  npmignore: false,
  changelog: false,
  wercker: false,
  git: false,
  removeSelf: false
});


module.exports = {
  noBuildWarning,
  defaultBuild,
  npmBuild,
  webTargetBuild,
  node8TargetBuild,
  nameChangeBuild,
  omitAllRootFiles,
};
