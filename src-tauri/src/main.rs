// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;

use slcore::Shared;
use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
#[specta::specta]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command(async)]
#[specta::specta]
async fn app_ready(app_handle: tauri::AppHandle) {
    let window = app_handle.get_window("main").unwrap();

    window.show().unwrap();
}

macro_rules! tauri_handlers {
	($($name:path),+) => {{
		#[cfg(debug_assertions)]
		tauri_specta::ts::export(specta::collect_types![$($name),+], "../src/lib/commands.ts").unwrap();

		tauri::generate_handler![$($name),+]
	}};
}
#[tokio::main]
async fn main() {
    let client = Arc::new(slcore::db::migrator::new_client().await.unwrap());
    let router = slcore::routes::start_router();

    tauri::Builder::default()
        .plugin(rspc::integrations::tauri::plugin(router, move || Shared {
            client: Arc::clone(&client),
        }))
        .invoke_handler(tauri_handlers![app_ready, greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
