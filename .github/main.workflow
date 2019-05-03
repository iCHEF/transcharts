workflow "Push workflow" {
  on = "push"
  resolves = ["deploy"]
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

action "Filters for master" {
  uses = "actions/bin/filter@master"
  needs = ["type-check"]
  args = "branch master"
}

action "release" {
  uses = "borales/actions-yarn@master"
  needs = ["Filters for master"]
  args = "release"
}

action "deploy" {
  uses = "borales/actions-yarn@master"
  needs = ["release"]
  args = "deploy"
}
