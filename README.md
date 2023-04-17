### 项目部署 github

## 参考

- 部署方法 https://zhuanlan.zhihu.com/p/88481760
- 白屏解决 https://www.cnblogs.com/hello9102/p/13440518.html

# 必须 build

npm run build

# 自动部署（后续直接提交代码即可）

npm run deploy

# 手动部署（后续提交代码后，每次都有执行此命令进行部署）

git subtree push --prefix=rain-little-baby origin gh-pages

已配置命令

npm run deploy:hand
