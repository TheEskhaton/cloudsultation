const { Toolkit } = require("actions-toolkit");

const tools = new Toolkit();

// You could also hard-code these as this
// action is bound to one repository but this makes
// copy-pasting this code easier
const { owner, repo } = tools.context.repo;

// The SHA of the commit that triggered this action.
// Makes sure this status is associated with the
// correct commit.
const { sha } = tools.context;

// These are inputs that we define. You can extend those
// or change their names if you like
const { state, description } = tools.inputs;

tools.github.repos
  .createStatus({
    owner,
    repo,
    sha,
    state,
    description,
    target_url: `https://www.github.com/${owner}/${repo}/commit/${sha}/checks`,
  })
  .then(() => {
    tools.exit.success();
  })
  .catch((error) => {
    tools.log.fatal(error);
    tools.exit.failure();
  });
