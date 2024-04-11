use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn publish() -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_exec(vec![
            "pkgx",
            "+nodejs.org@18",
            "+git",
            "+bun@1.1.3",
            "bun",
            "install",
        ])?
        .with_exec(vec![
            "pkgx",
            "+nodejs.org@18",
            "+git",
            "+bun@1.1.3",
            "bunx",
            "chromatic",
            "--exit-zero-on-changes",
        ])?
        .stdout()?;
    Ok(stdout)
}
