(ns atoms)

(defonce apis (atom {}))
(defonce ipc-main (atom nil))
(defonce ipc-renderer (atom nil))
