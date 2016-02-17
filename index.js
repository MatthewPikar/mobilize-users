/**
 * Created by mattpiekarczyk on 11/4/15.
 */
"use strict";

var _ = require('lodash')
var options = {}

for(var i= 2, len=process.argv.length; i<len; i++){
    var argument = process.argv[i].split(':')
    options[argument[0]] = argument[1]
}

_.extend(options, {
    resourceName: 'users',
    resourceFormat: {
        required$: ['name'],
        only$: ['id','name','created','modified','image'],
        id: 'string$',
        name: 'string$',
        created: 'string$',
        modified: 'string$',
        image: 'string$',
        interests: 'array$',
        actions: 'array$'
    }
})

require('seneca')()
    .use('redis-transport')
    .use('resource-service', options)
    .listen({type:'redis', pin:'role:users,cmd:get'})
    .listen({type:'redis', pin:'role:users,cmd:query'})
    .listen({type:'redis', pin:'role:users,cmd:add'})
    .listen({type:'redis', pin:'role:users,cmd:modify'})
    .listen({type:'redis', pin:'role:users,cmd:delete'})