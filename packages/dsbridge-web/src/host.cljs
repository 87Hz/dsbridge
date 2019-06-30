(ns host
  (:require [util :as u]))

(def dsf (u/get-global "_dsf"))
(def dsaf (u/get-global "_dsaf"))

(defn callHandler
  "Call handlers registered in Web"
  [])

(defn hasJavascriptMethod
  "Test whether the handler exist in javascript"
  [method async?])
