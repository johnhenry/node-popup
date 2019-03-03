EEE=$(git diff  --staged --name-only HEAD | grep -E '\.ts$')

if [ -z "$EEE" ]
then
      exit 0
else
      npm run tslint --fix $EEE
fi
