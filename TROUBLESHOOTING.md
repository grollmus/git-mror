# "Permission denied" while running `./bin/dev` or `./bin/run` on unix based systems
This problem appears mostly on a fresh repository checkout, this file missing the execution rights. The following command should solve the problem.

```bash
$ chmod +x ./bin/dev
```
