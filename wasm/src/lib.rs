//extern crate cfg_if;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn alert_input_size(size: usize) {
    alert(&format!("Input Size is {}", size));
}
