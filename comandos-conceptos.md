Comangos varios
ng g component login --spec=false -s
 2027  ng g component nopagefound --spec=false -s
 2028  ng g component pages/dashboard --spec=false -s
 2029  ng g component pages/progress --spec=false -s
 2030  ng g component pages/graficas1 --spec=false -s
 2031  ng g component shared/header --spec=false -s
 2032  ng g component shared/sidebar --spec=false -s
 2033  ng g component shared/breadcrumbs --spec=false -s
 2034  ng server -o
 2035  ng serve -o
 2036  ng h --help
 2037  ng help generate
 2038  ng help
 2039  ng help help
 2040  ng generate --help
 2041  ng generate service --help
 2042  ng generate service --spec=false
 2043  ng generate service shared --spec=false
 2044  ng generate service sidebar --spec=false

 Resumir la importación de páginas, separarlas en otro módulo

Problemática

01 Angular no puede manejar atributos que no conoce


ANGULAR
Para que angular maneje los atributos
[style.width]="progreso + '%'" style="width: 50%"
[attr.ariaValuenow]="progreso" aria-valuenow="50"

Conecta variable con el value de un input
name="progreso" [(ngModel)]="progreso"


Sobre los inputs y outputs
    [leyenda]="olakase" // manda la variable olakase
    leyenda="olakase" // manda el string olakase

Crear un output
    necesitamos asociarlo con un emitter