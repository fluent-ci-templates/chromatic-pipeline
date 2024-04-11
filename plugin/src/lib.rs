use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn publish() -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_exec(vec![
            "pkgx",
            "+node@18",
            "+git",
            "+classic.yarnpkg.com",
            "yarn",
            "install",
        ])?
        .with_exec(vec![
            "pkgx",
            "+node@18",
            "+git",
            "+bun",
            "bunx",
            "chromatic",
            "--exit-zero-on-changes",
        ])?
        .stdout()?;
    Ok(stdout)
}
