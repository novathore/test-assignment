1. docker pull registry.jetbrains.tm/p/mp/public-docker-registry/candidate-assignment:latest
2. docker run -it -p 8070:8080 registry.jetbrains.tm/p/mp/public-docker-registry/candidate-assignment:latest
3. npm start
4. http://localhost:8080/
5. enjoy

=================================================

Из вендоров использовал redux-toolkitjs, material-ui ( компонент рейтинга )

На что не хватило времени и прочие недочеты
1. Нормально реализовать диалог и попап ( сделано через костыли )
2. Реализовать компонент рейтинга и соотвествующую работу с svg (текущий компонент взят и material-ui)
3. Только под конец осознал как работать redux-toolkitjs, поэтому качество кодовой базы немного хромает
4. Нет индикации ошибок OAPI в ui
5. Не до конца осознал ключ fullDescription и что с ним нужно делать. Работаю как со строкой
6. Footer не стал верстать т.к там 0 функциональности, а свободного времени уже не осталось
