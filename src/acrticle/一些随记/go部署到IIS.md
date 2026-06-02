---
title: go部署到IIS
icon:
order: 45
category:
  - 一些随记
tag:
  - golang
  - IIS
---

# Go部署到IIS

## 前置准备

### 1. 安装ASP.NET Core Hosting Bundle

首先需要安装 **ASP.NET Core Hosting Bundle**。

### 2. 设置IIS_IUSRS权限

确保 `IIS_IUSRS` 用户有相应的权限。

---

## 配置步骤

### 1. 动态获取端口

在Go代码中动态获取端口（并设置默认的端口）：

```go
port := os.Getenv("ASPNETCORE_PORT")
if port == "" {
    port = "8080"
}

r.Run(":" + port)
```

### 2. 创建web.config文件

在项目根目录创建 `web.config` 文件：

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath=".\Test_HelloWorld_WebAPI.exe" arguments="" stdoutLogEnabled="false" stdoutLogFile=".\stdout" />
    </system.webServer>
  </location>
</configuration>
```

---

## 完整代码示例

### main.go

```go
package main

import (
	"Test_HelloWorld_WebAPI/router"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default() // 创建一个默认的 Gin 路由器
	// Load configuration

	// Setup all routes
	router.SetupRoutes(r) // 配置所有路由，这个是自己写的函数文件


	port := os.Getenv("ASPNETCORE_PORT")
	if port == "" {
		port = "8080"
	}
	
	r.Run(":" + port)
}
```

### service/hello_service.go

```go
service/hello_service.go


package service

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func HelloWorld(c *gin.Context) {

	c.JSON(http.StatusOK, gin.H{
		"message": "hello world",
	})

}
```

### router/router.go

```go
package router

import (
	"Test_HelloWorld_WebAPI/service"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {

	// 使用路由组的方式（推荐）
	// 创建路由组，统一添加 "/api" 前缀
	api := r.Group("/api")
	{
		// 注册 GET 路由：/api/hello -> service.HelloWorld
		api.GET("/hello", service.HelloWorld)
	}

	// 不使用路由组的方式（不推荐，仅作演示）
	// r.GET("/api/hello", service.HelloWorld)
}
```