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

#[wasm_bindgen]
pub fn get_array(size: usize) -> Vec<i32> {
    let mut array = Vec::with_capacity(size * size);
    for _ in 0..size {
        array.extend(vec![0i32; size]);
    }
    array
}
