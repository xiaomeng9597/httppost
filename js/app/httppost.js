function jstrim(val) {
	if (val == "" || val == null || val == undefined) {
		return "";
	} else {
		try {
			return toString2(val).replace(/(^\s*)|(\s*$)/g, "");
		} catch (err) {
			return val;
		}
	}
};

function JsonLength(jsonObj) {
	var size = 0;
	for (key in jsonObj) {
		if (jsonObj.hasOwnProperty(key)) {
			size++;
		}
	}
	return size;
};

if (ajaxurl == "" || ajaxurl == null || ajaxurl == undefined) {
	function doPost(url, data, n, i, o) {
		try {
			retbody = "";
			errbody = "";
			retstatusCode = "";
			errstatusCode = "";
			retjson = {};
			posturl = data.url;
			methods = data.type;
			getcode = data.code;
			getcookie = data.cookie;
			getheaders = data.headers;
			contentType = data.contentType;
			delete(getheaders["content-length"]);
			delete(getheaders["Content-Length"]);
			if (methods != "GET" && contentType == "multipart/form-data") {
				if (getcookie) {
					var appheaders = {
						"Content-Type": "application/x-www-form-urlencoded; charset=" + getcode,
						"Cookie": getcookie
					}
				} else {
					var appheaders = {
						"Content-Type": "application/x-www-form-urlencoded; charset=" + getcode
					}
				}
			} else if (methods != "GET" && contentType) {
				if (getcookie) {
					var appheaders = {
						"Content-Type": contentType,
						"Cookie": getcookie
					}
				} else {
					var appheaders = {
						"Content-Type": contentType
					}
				}
			} else {
				if (getcookie) {
					var appheaders = {
						/*"Content-Type": "text/html; charset=" + getcode,*/
						"Cookie": getcookie
					}
				} else {
					var appheaders = {}
				}
			}
			if (methods == "GET") {
				delete(getheaders["content-type"]);
				delete(getheaders["Content-Type"]);
				headers_data = Object.assign(getheaders, appheaders);
				postData = "";
			} else if (methods != "GET" && data.params1 && Object.keys(data.params1).length > 0) {
				headers_data = Object.assign(getheaders, appheaders);
				postData = {
					values: data.params1
				};
			} else if (methods != "GET" && data.params2) {
				headers_data = Object.assign(getheaders, appheaders);
				postData = {
					body: jstrim(data.params2)
				};
			} else {
				headers_data = Object.assign(getheaders, appheaders);
				postData = "";
			}
			api.ajax({
				url: posturl,
				method: methods,
				dataType: "text",
				charset: getcode,
				data: postData,
				safeMode: "none",
				returnAll: true,
				encode: true,
				timeout: 120,
				cache: false,
				headers: headers_data
			}, function(ret, err) {
				var retbody = jstrim(ret["body"]);
				var errbody = jstrim(err["body"]);
				var retstatusCode = ret.statusCode;
				var errstatusCode = err.statusCode;
				if (retstatusCode == 0 || retstatusCode == 1 || retstatusCode == 2 || retstatusCode == 3 || retstatusCode == 4) {
					try {
						var retjson = {
							"code": 500,
							"msg": retbody,
							"data": {
								"header": "",
								"result": ""
							}
						}
						i(retjson);
					} catch (err) {
						var retjson = {
							"code": 500,
							"msg": "请求失败，请稍候重试",
							"data": {
								"header": "",
								"result": ""
							}
						}
						i(retjson);
					};
				} else if (errstatusCode == 0 || errstatusCode == 1 || errstatusCode == 2 || errstatusCode == 3 || errstatusCode == 4) {
					try {
						var retjson = {
							"code": 500,
							"msg": errbody,
							"data": {
								"header": "",
								"result": ""
							}
						}
						i(retjson);
					} catch (err) {
						var retjson = {
							"code": 500,
							"msg": "请求失败，请稍候重试",
							"data": {
								"header": "",
								"result": ""
							}
						}
						i(retjson);
					};
				} else if (retbody) {
					try {
						var retjson = {
							"code": 200,
							"msg": "请求成功！",
							"data": {
								"header": ret["headers"],
								"result": retbody
							}
						}
						n(retjson);
					} catch (err) {
						var retjson = {
							"code": 500,
							"msg": "请求失败，请稍候重试",
							"data": {
								"header": "",
								"result": ""
							}
						}
						i(retjson);
					};
				} else if (errbody) {
					try {
						var retjson = {
							"code": 200,
							"msg": "请求成功！",
							"data": {
								"header": err["headers"],
								"result": errbody
							}
						}
						n(retjson);
					} catch (err) {
						var retjson = {
							"code": 500,
							"msg": "请求失败，请稍候重试",
							"data": {
								"header": "",
								"result": ""
							}
						}
						i(retjson);
					};
				} else if ((retbody == "" || retbody == null) && retstatusCode) {
					try {
						var retjson = {
							"code": 500,
							"msg": "无返回值或者转换原始编码失败，网页状态码：" + retstatusCode,
							"data": {
								"header": "",
								"result": ""
							}
						}
						i(retjson);
					} catch (err) {
						var retjson = {
							"code": 500,
							"msg": "请求失败，请稍候重试",
							"data": {
								"header": "",
								"result": ""
							}
						}
						i(retjson);
					};
				} else if ((errbody == "" || errbody == null) && errstatusCode) {
					try {
						var retjson = {
							"code": 500,
							"msg": "无返回值或者转换原始编码失败，网页状态码：" + errstatusCode,
							"data": {
								"header": "",
								"result": ""
							}
						}
						i(retjson);
					} catch (err) {
						var retjson = {
							"code": 500,
							"msg": "请求失败，请稍候重试",
							"data": {
								"header": "",
								"result": ""
							}
						}
						i(retjson);
					};
				} else {
					var retjson = {
						"code": 500,
						"msg": "请求失败，请稍候重试",
						"data": {
							"header": "",
							"result": ""
						}
					}
					i(retjson);
				}
			});
		} catch (err) {
			var retjson = {
				"code": 500,
				"msg": "请求失败，请稍候重试",
				"data": {
					"header": "",
					"result": ""
				}
			}
			i(retjson);
		};
	}
};