module.exports = {
  "*.ts": (filenames) => {
    if (filenames.length > 50) {
      return [
        "yarn lint-fix",
        "git add ."
      ];
    } else {
      return [
        `eslint --fix ${filenames.join(" ")}`,
        `git add ${filenames.join(' ')}`
        ];
    }
  },
};
