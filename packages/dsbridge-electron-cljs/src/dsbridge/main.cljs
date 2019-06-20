(ns dsbridge.main)

(defonce ipc (atom nil))

(defn call [method arg]
  (.send @ipc method arg))

(defn init [global ipc-renderer]
  (let [fn-registry #js {:_obs #js []}
        dsbridge #js {:call call}]
    (reset! ipc ipc-renderer)
    (aset global "dscb" 0)
    (aset global "_dsInit" false)
    (aset global "_dsf" fn-registry)
    (aset global "_dsaf" fn-registry)
    (aset global "_dsbridge" dsbridge)
    (prn "dsbridge for web initialized")))
