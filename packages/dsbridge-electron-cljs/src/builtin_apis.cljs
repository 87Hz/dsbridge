(ns builtin-apis
  (:require [util :as u]
            [atoms :refer [apis]]))

(def ds-init
  (u/API. (fn [evt]
            (u/return-value evt true))
          nil
          "_dsb.dsinit"))

(def disable-javascript-dialog-block
  (u/API. (fn [evt arg-json]
            (let [js-arg (js/JSON.parse arg-json)
                  arg (js->clj js-arg)
                  disable (get-in arg ["data" "disable"])]
              (u/return-value evt disable)))
          nil
          "_dsb.disableJavascriptDialogBlock"))

(def has-native-method
  (u/API. (fn [evt arg-json]
            (let [js-arg (js/JSON.parse arg-json)
                  arg (js->clj js-arg)
                  name (get-in arg ["data" "name"])
                  type (get-in arg ["data" "type"])
                  api (get @apis name)]
              (->> (cond (nil? api) false
                         (= type "syn") (not (nil? api.sync-handler))
                         (= type "asyn") (not (nil? api.async-handler))
                         (= type "all") (and (not (nil? api.sync-handler))
                                             (not (nil? api.async-handler)))
                         :else false)
                   (u/return-value evt))))
          nil
          "_dsb.hasNativeMethod"))
