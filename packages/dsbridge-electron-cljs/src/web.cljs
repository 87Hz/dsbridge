(ns web
  (:require [utils :as u]
            [atoms :refer [ipc-renderer]]))

(defn call [method jsArg]
  (let [arg (js/JSON.parse jsArg)]
    (prn (str "Calling " method " with arg " jsArg))
    (if (u/is-sync-call arg)
      (.sendSync ^js @ipc-renderer method arg)
      (.send ^js @ipc-renderer method arg))))

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
