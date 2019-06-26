(ns index
  (:require [web :as w]
            [electron :as e]))

(def exports #js {:initWeb w/init
                  :initElectron e/init
                  :addJavascriptObject e/addJavascriptObject})
