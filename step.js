const child_process = require('child_process');

const REPO_URL = 'https://github.com/lbogdan/voxxed-workshop';

function getCurrentStep() {
  const { status, stdout } = child_process.spawnSync(
    'git',
    ['describe', '--tags'],
    {
      encoding: 'utf8',
    }
  );
  if (status > 0) {
    console.error('Error: You are not on a step tag.');
    process.exit(1);
  }
  return parseInt(stdout.trim().substr(stdout.indexOf('-') + 1), 10);
}

function getComment() {
  const { stdout } = child_process.spawnSync(
    'git',
    ['log', '-1', '--pretty=%B'],
    {
      encoding: 'utf8',
    }
  );
  return stdout.trim();
}

function checkoutStep(step) {
  const { status } = child_process.spawnSync('git', [
    'checkout',
    `step-${step}`,
  ]);

  if (status > 0) {
    console.error(`Error: Step ${step} does not exist.`);
    process.exit(1);
  }

  console.log(`Step ${step}: ${getComment()}`);
  // if (step > 1) {
  // console.log(`Diff: ${REPO_URL}/compare/step-${step - 1}..step-${step}`);
  // } else {
  console.log(`Commit: ${REPO_URL}/commit/step-${step}`);
  // }
}

// const step = getCurrentStep();

// checkoutStep(step + 1);

if (process.argv.length < 3) {
  console.error(`Usage: node step step_number | next | prev`);
  process.exit(1);
}

const step = process.argv[2];

if (step === 'next') {
  checkoutStep(getCurrentStep() + 1);
} else if (step === 'prev') {
  checkoutStep(getCurrentStep() - 1);
} else {
  checkoutStep(step);
}
