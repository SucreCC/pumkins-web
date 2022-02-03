# Spring

## 前期准备

1. spring源码：自行去官网下载。
2. spring官方文档：[https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#spring-core](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#spring-core)
3. deepl翻译工具

**主要流程：阅读官方文档，以阅读过程中出现的类为突破口，由抽象至细节开始了解Spring，首先读顶部注释。**

## 第一层

1. 官方文档读完 1.2 Container Overview可以看如下源码。
2. 从上至下，从左至右的方式了解下图中的接口。

![image-20220119172041341](/Users/dengkai/Library/Application Support/typora-user-images/image-20220119172041341.png)

### BeanFactory

结论：beanFactory是一个顶层接口，只提供获取bean的能力，不提供bean的初始化和装配能力。

### HierarchicalBeanFactory

结论：

1. HierarchicalBeanFactory是继承 BeanFactory的一个二级接口这个接口拥有对工厂进行分层的能力。
2. 只记录当前工厂中的bean，不考虑分层工厂中的bean。
3. ConfigurableBeanFactory的setParentBeanFactory方法进行这个工作。

### ListableBeanFactory

结论：

1. ListableBeanFactory是继承 BeanFactory的一个二级接口，它提供列举所有bean实例、根据名字查找bean的能力。
2. 实现此类的实现类，即使也同时实现HierarchicalBeanFactory接口，在查找bean实例时，此接口只会返回在当前工厂中的bean实例，不会查询父工厂（BeanFactoryUtils可以帮助你从父工厂中查询bean实例）
3. 同时也会忽略其它非bean定义的方式注册的任何单例bean。
4. 实现这个接口的类，拥有从配置文件（如xml文件）预加载bean实例的能力（如 ClassPathXmlApplicationContext 和 FileSystemXmlApplicationContext 这两个通过xml方式装配bean的实现类）。

### EnvironmentCapable

了解EnvironmentCapable前先了解如下两个类。

![image-20220120125557097](/Users/dengkai/Library/Application Support/typora-user-images/image-20220120125557097.png)

#### PropertyResolver

​ 这个接口具有解析一系列属性值的能力（用于解析key-value键值对形势的属性），如properties,yaml,甚至是nosql文件。接口中定义了一系列读取，解析，判断是否包含制定属性的方法。

#### Environment

​ 这个接口是项目运行环境的抽象，这个环境由profiles（配置文件）和properties（属性文件）两个方面组成。配置文件可以用于定义bean对象，当然也可以通过注解的方式定义。

​ 属性文件在几乎所有应用程序中都扮演着重要角色，并且可能源自多种来源：属性文件、JVM 系统属性、系统环境变量、JNDI、servlet 上下文参数、ad-hoc Properties 对象、地图等。与属性相关的环境对象的作用是为用户提供一个方便的服务接口，用于配置属性源并从中解析属性。

#### ConfigurablePropertyResolver

ConfigurablePropertyResolver接口是一个二级接口，他除了拥有父接口PropertyResolver的能力，还扩展了类型转换，前缀，后缀，分隔符，属性校验的能力。

#### EnvironmentCapable

EnvironmentCapable是一个一级接口，实现这个接口可以获得获取项目运行环境的能力。

**带有capable后缀的接口在spring中通常带有获取xxx权利的含义。**

**spring很多接口都是读写分离的，最顶层接口一般都只会提供只读方法。**

### ApplicationEventPublisher

#### FunctionalInterface

FunctionalInterface是一个放置在ApplicationEventPublisher上的注解，表示被该注解标记的接口是一个函数式接口，无其它意义。

函数式接口：只有一个抽象方法，但默认方法和静态方法除外。

#### ApplicationEventPublisher

具有发布事件的能力。

### ResourcePatternResolver

#### ResourceLoader

一级接口，资源加载的策略接口。

资源加载器：提供全路径，类路径，相对路径加载资源的能力。

提供获取类加载器的能力。

#### ResourcePatternResolver

二级接口

path路径为 ’classpath*:‘ 多了一个通配符

能够进行批量解析，返回resource数组对象

### MessageSource

定义了访问国际化信息的接口。

