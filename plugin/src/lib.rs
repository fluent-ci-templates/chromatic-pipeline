use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn publish() -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_packages(vec!["node@18", "bun", "git", "classic.yarnpkg.com"])?
        .with_exec(vec!["yarn", "install"])?
        .with_exec(vec!["bunx", "chromatic", "--exit-zero-on-changes"])?
        .stdout()?;
    Ok(stdout)
}
