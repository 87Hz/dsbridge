(ns dsbridge.web.main)

(defn call [method]
  (prn method))

(defn init [global]
  (let [fn-registry #js {:_obs #js []}
        dsbridge #js {:call call}]
    (aset global "dscb" 0)
    (aset global "_dsInit" false)
    (aset global "_dsf" fn-registry)
    (aset global "_dsaf" fn-registry)
    (aset global "_dsbridge" dsbridge)))

(defn init! []
  (init js/window)
  (prn "dsbridge for web initialized"))
