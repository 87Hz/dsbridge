(ns host
  (:require [util :as u]))

(def dsf (u/get-global "_dsf"))
(def dsaf (u/get-global "_dsaf"))

(defn callHandler
  "Call handlers registered in Web"
  ([method-name args cb]
   (let [handler (dsaf method-name)]
     (handler args cb)))

  ([method-name args]
   (let [handler (dsf method-name)]
     (handler args))))

(defn hasJavascriptMethod
  "Test whether the handler exist in javascript"
  [method async?])
