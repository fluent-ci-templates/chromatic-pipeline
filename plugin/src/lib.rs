use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn publish() -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_exec(vec![
            "pkgx",
            "+node@22",
            "+git",
            "+bun@1.1.43",
            "bun",
            "install",
        ])?
        .with_exec(vec![
            "pkgx",
            "+node@22",
            "+git",
            "+bun@1.1.43",
            "bunx",
            "chromatic",
            "--exit-zero-on-changes",
        ])?
        .stdout()?;
    Ok(stdout)
}
