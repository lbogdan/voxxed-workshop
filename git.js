const child_process = require('child_process');

const { stdout } = child_process.spawnSync(
  'git',
  ['log', '--oneline', '--reverse'],
  {
    encoding: 'utf8',
  }
);
const commits = stdout
  .trim()
  .split('\n')
  .map(commit => {
    const matches = commit.match(/^(\w+) (.*)$/);
    return {
      sha: matches[1],
      message: matches[2],
    };
  });

const firstIndex = commits.findIndex(
  commit => commit.message === 'Create first simple component.'
);

for (let i = firstIndex; i < commits.length; i++) {
  const commit = commits[i];
  const step = i - firstIndex + 1;
  console.log(`step ${step}: ${commit.message}`);
  const { stdout } = child_process.spawnSync(
    'git',
    ['tag', '-a', `step-${step}`, '-f', '-m', `step ${step}`, commit.sha],
    { encoding: 'utf8' }
  );
  console.log(stdout.trim());
}
