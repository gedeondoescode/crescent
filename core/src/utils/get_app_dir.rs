use std::path::PathBuf;

pub fn get_streamline_dir() -> PathBuf {
    let path = platform_dirs::AppDirs::new(Some("streamline"), true).unwrap();
    let mut data_dir = path.data_dir;

    if cfg!(debug_assertions) {
        data_dir.push("dev");
    }

    data_dir
}
