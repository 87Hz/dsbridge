(ns index)

;; ==========================================================
;; Web (Renderer)
;; ----------------------------------------------------------
(defonce ipc-renderer (atom nil))

(defn call [method arg]
  (.send @ipc-renderer method arg))

(defn init-web [global ipcRenderer]
  (let [fn-registry #js {:_obs #js []}
        dsbridge #js {:call call}]
    (reset! ipc-renderer ipcRenderer)
    (aset global "dscb" 0)
    (aset global "_dsInit" false)
    (aset global "_dsf" fn-registry)
    (aset global "_dsaf" fn-registry)
    (aset global "_dsbridge" dsbridge)
    (prn "dsbridge for web initialized")))

;; ==========================================================
;; Electron (Main)
;; ----------------------------------------------------------
(defonce ipc-main (atom nil))

(defn init-electron [ipcMain]
  (reset! ipc-main ipcMain))

;; ==========================================================
;; Exports
;; ----------------------------------------------------------
;; for ESModule
(def ^:export default #js {:initWeb init-web
                           :initElectron init-electron})

;; for CommonJS
(def ^:export initWeb init-web)
(def ^:export initElectron init-electron)


