workflow "sample-workflow" {
  on = "push"
  resolves = ["git Actions"]
}

action "git Actions" {
  uses = "srt32/git-actions@v0.0.3"
  args = "git --no-pager log"
}
