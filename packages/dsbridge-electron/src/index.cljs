(ns index
  (:require [web :as w]
            [native :as n]))

(def exports #js {:initWeb w/init
                  :initNative n/init
                  :addJavascriptObject n/addJavascriptObject})
