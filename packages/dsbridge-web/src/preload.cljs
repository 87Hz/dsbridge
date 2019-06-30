(ns preload)

(defn call [] nil)

(defn init
  "Init Web to be DSBridge ready"
  []
  (let [global js/window
        js-methods #js {:_obs #js []}
        dsbridge #js {:call call}]
    (aset global "dscb" 0)
    (aset global "_dsInit" false)
    (aset global "_dsf" js-methods)
    (aset global "_dsaf" js-methods)
    (aset global "_dsbridge" dsbridge)
    (prn "DSBridge for Web initialized.")))
