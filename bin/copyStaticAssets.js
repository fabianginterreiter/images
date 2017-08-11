var shell = require('shelljs');

shell.mkdir('-p', 'dist');
shell.cp('-R', 'src/public/', 'dist/');

shell.cp("node_modules/react/dist/react.min.js", "dist/public/vendor/javascript/react.min.js");
shell.cp("node_modules/react-router/umd/ReactRouter.min.js", "dist/public/vendor/javascript/react-router.min.js");
shell.cp("node_modules/react-dom/dist/react-dom.min.js", "dist/public/vendor/javascript/react-dom.min.js");
shell.cp("node_modules/jquery/dist/jquery.min.js", "dist/public/vendor/javascript/jquery.min.js");
shell.cp("node_modules/moment/min/moment.min.js", "dist/public/vendor/javascript/moment.min.js");