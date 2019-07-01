(ns web
  (:require [util :as u]
            [atoms :refer [ipc-renderer]]))

(defn call [method arg-json]
  (let [js-arg (js/JSON.parse arg-json)]
    (if (u/is-sync-call js-arg)
      ;; sync call
      (.sendSync ^js @ipc-renderer method arg-json)
      ;; async call
      (let [arg (js->clj js-arg)
            dscbstub (get arg "_dscbstub")]
        (do (.send ^js @ipc-renderer method arg-json)
            (.once ^js @ipc-renderer dscbstub
                   (fn [_ js-res]
                     (let [dscb (aget js/window dscbstub)]
                       (dscb js-res)))))))))

(defn init
  "Init BrowerWindow/View to be DS ready"
  [ipcRenderer]
  (let [global js/window
        js-methods #js {:_obs #js []}
        dsbridge #js {:call call}]
    (reset! ipc-renderer ipcRenderer)
    (aset global "dscb" 0)
    (aset global "_dsInit" false)
    (aset global "_dsf" js-methods)
    (aset global "_dsaf" js-methods)
    (aset global "_dsbridge" dsbridge)
    (prn "DSBridge for Web initialized.")))
