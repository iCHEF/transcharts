workflow "Push workflow" {
  on = "push"
  resolves = ["type-check"]
}

action "install" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "type-check" {
  uses = "borales/actions-yarn@master"
  needs = ["install"]
  args = "type-check"
}
