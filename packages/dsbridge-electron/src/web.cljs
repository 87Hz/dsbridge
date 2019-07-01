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

(defn init-dsfs
  "Construct DSBridge Web function registry"
  []
  #js {:_obs #js []})

(defn init
  "Init BrowerWindow/View to be DS ready"
  [ipcRenderer]
  (let [global js/window
        dsbridge #js {:call call}]
    (reset! ipc-renderer ipcRenderer)
    (aset global "dscb" 0)
    (aset global "_dsInit" false)
    (aset global "_dsf" (init-dsfs))
    (aset global "_dsaf" (init-dsfs))
    (aset global "_dsbridge" dsbridge)
    (prn "DSBridge for Web initialized.")))

;; -------------------------------------------------
;; dsBridge.hasNativeMethod (handlerName,[type])
;; Test whether the handler exist in Java, the handlerName can contain the namespace.
;; type: optional["all"|"syn"|"asyn" ], default is "all".

;; dsBridge.disableJavascriptDialogBlock (disable)
;; Calling dsBridge.disableJavascriptDialogBlock (...) has the
;; same effect as calling dwebview.disableJavascriptDialogBlock (...) in Java.
