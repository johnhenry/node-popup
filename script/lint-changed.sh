FILES=$(git diff  --staged --name-only HEAD | grep -E '\.ts$')

if [ -z "$FILES" ]
then
        exit 0
else
        npm run tslint $FILES
fi
