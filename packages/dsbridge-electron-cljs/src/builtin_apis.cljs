(ns builtin-apis
  (:require [utils :as u]))

(def ds-init
  (u/API. (u/return-value true)
          nil
          "_dsb.dsinit"))

(def disable-javascript-dialog-block
  (u/API. (u/return-value true)
          nil
          "_dsb.disableJavascriptDialogBlock"))

(def has-native-method
  (u/API. (u/return-value "hello")
          nil
          "_dsb.hasNativeMethod"))
