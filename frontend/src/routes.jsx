import Home from './pages/Home'

import Country from './pages/Countries'
import CountryNew from './pages/Countries/new'
import CountryDetail from './pages/Countries/[id]'

import Customer from './pages/Customers'
import CustomerNew from './pages/Customers/new'
import CustomerDetail from './pages/Customers/[id]'

import Category from './pages/Categories'
import CategoryNew from './pages/Categories/new'
import CategoryDetail from './pages/Categories/[id]'

import Post from './pages/Posts'
import PostDetail from './pages/Posts/[id]'
import PostNew from './pages/Posts/new'


export default [
  {
    path: '/',
    title: 'Home',
    exact: true,
    component: Home,
    childrens: [],
  },
  {
    path: '/countries',
    title: 'Countries',
    exact: true,
    component: Country,
    childrens: [
      {
        path: '/countries/new',
        title: 'New country',
        exact: true,
        component: CountryNew,
        childrens: [],
      },
      {
        path: '/countries/:id',
        title: 'Edit country',
        exact: true,
        component: CountryDetail,
        childrens: [],
      },
    ],
  },
  {
    path: '/customers',
    title: 'Customers',
    exact: true,
    component: Customer,
    childrens: [
      {
        path: '/customers/new',
        title: 'New customer',
        exact: true,
        component: CustomerNew,
        childrens: [],
      },
      {
        path: '/customers/:id',
        title: 'Edit customer',
        exact: true,
        component: CustomerDetail,
        childrens: [],
      },
    ],
  },
  {
    path: '/categories',
    title: 'Categories',
    exact: true,
    component: Category,
    childrens: [
      {
        path: '/categories/new',
        title: 'New category',
        exact: true,
        component: CategoryNew,
        childrens: [],
      },
      {
        path: '/categories/:id',
        title: 'Edit category',
        exact: true,
        component: CategoryDetail,
        childrens: [],
      },
    ],
  },
  {
    path: '/posts',
    title: 'Posts',
    exact: true,
    component: Post,
    childrens: [
      {
        path: '/posts/:id',
        title: 'Edit post',
        exact: true,
        component: PostDetail,
        childrens: [],
      },
      {
        path: '/posts/new',
        title: 'New post',
        exact: true,
        component: PostNew,
        childrens: [],
      },
    ],
  },
]
