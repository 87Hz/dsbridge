(ns preload)

(defn call [] nil)

(defn init-dsfs
  "Construct DSBridge function registry"
  []
  #js {:_obs #js []})

(defn init
  "Init Web to be DSBridge ready"
  []
  (let [global js/window
        dsf-registry #js {:_obs #js []}
        dsbridge #js {:call call}]
    (aset global "dscb" 0)
    (aset global "_dsInit" false)
    (aset global "_dsf" (init-dsfs))
    (aset global "_dsaf" (init-dsfs))
    (aset global "_dsbridge" dsbridge)
    (prn "DSBridge for Web initialized.")))
