(ns handlers)

(defn return
  "Reply as response of sync call"
  [value]
  #(set! (.-returnValue %) value))

(def ds-init
  ["_dsb.dsinit" (return true)])

(def disable-javascript-dialog-block
  ["_dsb.disableJavascriptDialogBlock" (return true)])

(def has-native-method
  ["_dsb.hasNativeMethod" (return "123")])
