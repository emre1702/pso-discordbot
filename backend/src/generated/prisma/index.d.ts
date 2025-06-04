
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model discord_users
 * 
 */
export type discord_users = $Result.DefaultSelection<Prisma.$discord_usersPayload>
/**
 * Model guilds
 * 
 */
export type guilds = $Result.DefaultSelection<Prisma.$guildsPayload>
/**
 * Model team_roles
 * 
 */
export type team_roles = $Result.DefaultSelection<Prisma.$team_rolesPayload>
/**
 * Model teams
 * 
 */
export type teams = $Result.DefaultSelection<Prisma.$teamsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const language: {
  en_US: 'en_US',
  tr: 'tr'
};

export type language = (typeof language)[keyof typeof language]


export const team_role: {
  Player: 'Player',
  Co_Captain: 'Co_Captain',
  Captain: 'Captain'
};

export type team_role = (typeof team_role)[keyof typeof team_role]

}

export type language = $Enums.language

export const language: typeof $Enums.language

export type team_role = $Enums.team_role

export const team_role: typeof $Enums.team_role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Discord_users
 * const discord_users = await prisma.discord_users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Discord_users
   * const discord_users = await prisma.discord_users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.discord_users`: Exposes CRUD operations for the **discord_users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Discord_users
    * const discord_users = await prisma.discord_users.findMany()
    * ```
    */
  get discord_users(): Prisma.discord_usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guilds`: Exposes CRUD operations for the **guilds** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guilds
    * const guilds = await prisma.guilds.findMany()
    * ```
    */
  get guilds(): Prisma.guildsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team_roles`: Exposes CRUD operations for the **team_roles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Team_roles
    * const team_roles = await prisma.team_roles.findMany()
    * ```
    */
  get team_roles(): Prisma.team_rolesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teams`: Exposes CRUD operations for the **teams** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.teams.findMany()
    * ```
    */
  get teams(): Prisma.teamsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    discord_users: 'discord_users',
    guilds: 'guilds',
    team_roles: 'team_roles',
    teams: 'teams'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "discord_users" | "guilds" | "team_roles" | "teams"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      discord_users: {
        payload: Prisma.$discord_usersPayload<ExtArgs>
        fields: Prisma.discord_usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.discord_usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.discord_usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload>
          }
          findFirst: {
            args: Prisma.discord_usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.discord_usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload>
          }
          findMany: {
            args: Prisma.discord_usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload>[]
          }
          create: {
            args: Prisma.discord_usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload>
          }
          createMany: {
            args: Prisma.discord_usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.discord_usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload>[]
          }
          delete: {
            args: Prisma.discord_usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload>
          }
          update: {
            args: Prisma.discord_usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload>
          }
          deleteMany: {
            args: Prisma.discord_usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.discord_usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.discord_usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload>[]
          }
          upsert: {
            args: Prisma.discord_usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$discord_usersPayload>
          }
          aggregate: {
            args: Prisma.Discord_usersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiscord_users>
          }
          groupBy: {
            args: Prisma.discord_usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<Discord_usersGroupByOutputType>[]
          }
          count: {
            args: Prisma.discord_usersCountArgs<ExtArgs>
            result: $Utils.Optional<Discord_usersCountAggregateOutputType> | number
          }
        }
      }
      guilds: {
        payload: Prisma.$guildsPayload<ExtArgs>
        fields: Prisma.guildsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.guildsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.guildsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          findFirst: {
            args: Prisma.guildsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.guildsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          findMany: {
            args: Prisma.guildsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>[]
          }
          create: {
            args: Prisma.guildsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          createMany: {
            args: Prisma.guildsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.guildsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>[]
          }
          delete: {
            args: Prisma.guildsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          update: {
            args: Prisma.guildsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          deleteMany: {
            args: Prisma.guildsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.guildsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.guildsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>[]
          }
          upsert: {
            args: Prisma.guildsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$guildsPayload>
          }
          aggregate: {
            args: Prisma.GuildsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuilds>
          }
          groupBy: {
            args: Prisma.guildsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuildsGroupByOutputType>[]
          }
          count: {
            args: Prisma.guildsCountArgs<ExtArgs>
            result: $Utils.Optional<GuildsCountAggregateOutputType> | number
          }
        }
      }
      team_roles: {
        payload: Prisma.$team_rolesPayload<ExtArgs>
        fields: Prisma.team_rolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.team_rolesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.team_rolesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload>
          }
          findFirst: {
            args: Prisma.team_rolesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.team_rolesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload>
          }
          findMany: {
            args: Prisma.team_rolesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload>[]
          }
          create: {
            args: Prisma.team_rolesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload>
          }
          createMany: {
            args: Prisma.team_rolesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.team_rolesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload>[]
          }
          delete: {
            args: Prisma.team_rolesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload>
          }
          update: {
            args: Prisma.team_rolesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload>
          }
          deleteMany: {
            args: Prisma.team_rolesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.team_rolesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.team_rolesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload>[]
          }
          upsert: {
            args: Prisma.team_rolesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$team_rolesPayload>
          }
          aggregate: {
            args: Prisma.Team_rolesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam_roles>
          }
          groupBy: {
            args: Prisma.team_rolesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Team_rolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.team_rolesCountArgs<ExtArgs>
            result: $Utils.Optional<Team_rolesCountAggregateOutputType> | number
          }
        }
      }
      teams: {
        payload: Prisma.$teamsPayload<ExtArgs>
        fields: Prisma.teamsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.teamsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.teamsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          findFirst: {
            args: Prisma.teamsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.teamsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          findMany: {
            args: Prisma.teamsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>[]
          }
          create: {
            args: Prisma.teamsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          createMany: {
            args: Prisma.teamsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.teamsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>[]
          }
          delete: {
            args: Prisma.teamsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          update: {
            args: Prisma.teamsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          deleteMany: {
            args: Prisma.teamsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.teamsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.teamsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>[]
          }
          upsert: {
            args: Prisma.teamsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$teamsPayload>
          }
          aggregate: {
            args: Prisma.TeamsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeams>
          }
          groupBy: {
            args: Prisma.teamsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamsGroupByOutputType>[]
          }
          count: {
            args: Prisma.teamsCountArgs<ExtArgs>
            result: $Utils.Optional<TeamsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    discord_users?: discord_usersOmit
    guilds?: guildsOmit
    team_roles?: team_rolesOmit
    teams?: teamsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Discord_usersCountOutputType
   */

  export type Discord_usersCountOutputType = {
    team_roles: number
    teams_teams_created_byTodiscord_users: number
    teams_teams_ownerTodiscord_users: number
  }

  export type Discord_usersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team_roles?: boolean | Discord_usersCountOutputTypeCountTeam_rolesArgs
    teams_teams_created_byTodiscord_users?: boolean | Discord_usersCountOutputTypeCountTeams_teams_created_byTodiscord_usersArgs
    teams_teams_ownerTodiscord_users?: boolean | Discord_usersCountOutputTypeCountTeams_teams_ownerTodiscord_usersArgs
  }

  // Custom InputTypes
  /**
   * Discord_usersCountOutputType without action
   */
  export type Discord_usersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discord_usersCountOutputType
     */
    select?: Discord_usersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Discord_usersCountOutputType without action
   */
  export type Discord_usersCountOutputTypeCountTeam_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: team_rolesWhereInput
  }

  /**
   * Discord_usersCountOutputType without action
   */
  export type Discord_usersCountOutputTypeCountTeams_teams_created_byTodiscord_usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: teamsWhereInput
  }

  /**
   * Discord_usersCountOutputType without action
   */
  export type Discord_usersCountOutputTypeCountTeams_teams_ownerTodiscord_usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: teamsWhereInput
  }


  /**
   * Count Type TeamsCountOutputType
   */

  export type TeamsCountOutputType = {
    team_roles: number
  }

  export type TeamsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team_roles?: boolean | TeamsCountOutputTypeCountTeam_rolesArgs
  }

  // Custom InputTypes
  /**
   * TeamsCountOutputType without action
   */
  export type TeamsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamsCountOutputType
     */
    select?: TeamsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamsCountOutputType without action
   */
  export type TeamsCountOutputTypeCountTeam_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: team_rolesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model discord_users
   */

  export type AggregateDiscord_users = {
    _count: Discord_usersCountAggregateOutputType | null
    _min: Discord_usersMinAggregateOutputType | null
    _max: Discord_usersMaxAggregateOutputType | null
  }

  export type Discord_usersMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    language: $Enums.language | null
  }

  export type Discord_usersMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    language: $Enums.language | null
  }

  export type Discord_usersCountAggregateOutputType = {
    id: number
    created_at: number
    language: number
    _all: number
  }


  export type Discord_usersMinAggregateInputType = {
    id?: true
    created_at?: true
    language?: true
  }

  export type Discord_usersMaxAggregateInputType = {
    id?: true
    created_at?: true
    language?: true
  }

  export type Discord_usersCountAggregateInputType = {
    id?: true
    created_at?: true
    language?: true
    _all?: true
  }

  export type Discord_usersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which discord_users to aggregate.
     */
    where?: discord_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of discord_users to fetch.
     */
    orderBy?: discord_usersOrderByWithRelationInput | discord_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: discord_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` discord_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` discord_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned discord_users
    **/
    _count?: true | Discord_usersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Discord_usersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Discord_usersMaxAggregateInputType
  }

  export type GetDiscord_usersAggregateType<T extends Discord_usersAggregateArgs> = {
        [P in keyof T & keyof AggregateDiscord_users]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiscord_users[P]>
      : GetScalarType<T[P], AggregateDiscord_users[P]>
  }




  export type discord_usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: discord_usersWhereInput
    orderBy?: discord_usersOrderByWithAggregationInput | discord_usersOrderByWithAggregationInput[]
    by: Discord_usersScalarFieldEnum[] | Discord_usersScalarFieldEnum
    having?: discord_usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Discord_usersCountAggregateInputType | true
    _min?: Discord_usersMinAggregateInputType
    _max?: Discord_usersMaxAggregateInputType
  }

  export type Discord_usersGroupByOutputType = {
    id: string
    created_at: Date
    language: $Enums.language | null
    _count: Discord_usersCountAggregateOutputType | null
    _min: Discord_usersMinAggregateOutputType | null
    _max: Discord_usersMaxAggregateOutputType | null
  }

  type GetDiscord_usersGroupByPayload<T extends discord_usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Discord_usersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Discord_usersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Discord_usersGroupByOutputType[P]>
            : GetScalarType<T[P], Discord_usersGroupByOutputType[P]>
        }
      >
    >


  export type discord_usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    language?: boolean
    team_roles?: boolean | discord_users$team_rolesArgs<ExtArgs>
    teams_teams_created_byTodiscord_users?: boolean | discord_users$teams_teams_created_byTodiscord_usersArgs<ExtArgs>
    teams_teams_ownerTodiscord_users?: boolean | discord_users$teams_teams_ownerTodiscord_usersArgs<ExtArgs>
    _count?: boolean | Discord_usersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["discord_users"]>

  export type discord_usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    language?: boolean
  }, ExtArgs["result"]["discord_users"]>

  export type discord_usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    language?: boolean
  }, ExtArgs["result"]["discord_users"]>

  export type discord_usersSelectScalar = {
    id?: boolean
    created_at?: boolean
    language?: boolean
  }

  export type discord_usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "language", ExtArgs["result"]["discord_users"]>
  export type discord_usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team_roles?: boolean | discord_users$team_rolesArgs<ExtArgs>
    teams_teams_created_byTodiscord_users?: boolean | discord_users$teams_teams_created_byTodiscord_usersArgs<ExtArgs>
    teams_teams_ownerTodiscord_users?: boolean | discord_users$teams_teams_ownerTodiscord_usersArgs<ExtArgs>
    _count?: boolean | Discord_usersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type discord_usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type discord_usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $discord_usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "discord_users"
    objects: {
      team_roles: Prisma.$team_rolesPayload<ExtArgs>[]
      teams_teams_created_byTodiscord_users: Prisma.$teamsPayload<ExtArgs>[]
      teams_teams_ownerTodiscord_users: Prisma.$teamsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      language: $Enums.language | null
    }, ExtArgs["result"]["discord_users"]>
    composites: {}
  }

  type discord_usersGetPayload<S extends boolean | null | undefined | discord_usersDefaultArgs> = $Result.GetResult<Prisma.$discord_usersPayload, S>

  type discord_usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<discord_usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Discord_usersCountAggregateInputType | true
    }

  export interface discord_usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['discord_users'], meta: { name: 'discord_users' } }
    /**
     * Find zero or one Discord_users that matches the filter.
     * @param {discord_usersFindUniqueArgs} args - Arguments to find a Discord_users
     * @example
     * // Get one Discord_users
     * const discord_users = await prisma.discord_users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends discord_usersFindUniqueArgs>(args: SelectSubset<T, discord_usersFindUniqueArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Discord_users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {discord_usersFindUniqueOrThrowArgs} args - Arguments to find a Discord_users
     * @example
     * // Get one Discord_users
     * const discord_users = await prisma.discord_users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends discord_usersFindUniqueOrThrowArgs>(args: SelectSubset<T, discord_usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Discord_users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {discord_usersFindFirstArgs} args - Arguments to find a Discord_users
     * @example
     * // Get one Discord_users
     * const discord_users = await prisma.discord_users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends discord_usersFindFirstArgs>(args?: SelectSubset<T, discord_usersFindFirstArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Discord_users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {discord_usersFindFirstOrThrowArgs} args - Arguments to find a Discord_users
     * @example
     * // Get one Discord_users
     * const discord_users = await prisma.discord_users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends discord_usersFindFirstOrThrowArgs>(args?: SelectSubset<T, discord_usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Discord_users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {discord_usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Discord_users
     * const discord_users = await prisma.discord_users.findMany()
     * 
     * // Get first 10 Discord_users
     * const discord_users = await prisma.discord_users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const discord_usersWithIdOnly = await prisma.discord_users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends discord_usersFindManyArgs>(args?: SelectSubset<T, discord_usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Discord_users.
     * @param {discord_usersCreateArgs} args - Arguments to create a Discord_users.
     * @example
     * // Create one Discord_users
     * const Discord_users = await prisma.discord_users.create({
     *   data: {
     *     // ... data to create a Discord_users
     *   }
     * })
     * 
     */
    create<T extends discord_usersCreateArgs>(args: SelectSubset<T, discord_usersCreateArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Discord_users.
     * @param {discord_usersCreateManyArgs} args - Arguments to create many Discord_users.
     * @example
     * // Create many Discord_users
     * const discord_users = await prisma.discord_users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends discord_usersCreateManyArgs>(args?: SelectSubset<T, discord_usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Discord_users and returns the data saved in the database.
     * @param {discord_usersCreateManyAndReturnArgs} args - Arguments to create many Discord_users.
     * @example
     * // Create many Discord_users
     * const discord_users = await prisma.discord_users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Discord_users and only return the `id`
     * const discord_usersWithIdOnly = await prisma.discord_users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends discord_usersCreateManyAndReturnArgs>(args?: SelectSubset<T, discord_usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Discord_users.
     * @param {discord_usersDeleteArgs} args - Arguments to delete one Discord_users.
     * @example
     * // Delete one Discord_users
     * const Discord_users = await prisma.discord_users.delete({
     *   where: {
     *     // ... filter to delete one Discord_users
     *   }
     * })
     * 
     */
    delete<T extends discord_usersDeleteArgs>(args: SelectSubset<T, discord_usersDeleteArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Discord_users.
     * @param {discord_usersUpdateArgs} args - Arguments to update one Discord_users.
     * @example
     * // Update one Discord_users
     * const discord_users = await prisma.discord_users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends discord_usersUpdateArgs>(args: SelectSubset<T, discord_usersUpdateArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Discord_users.
     * @param {discord_usersDeleteManyArgs} args - Arguments to filter Discord_users to delete.
     * @example
     * // Delete a few Discord_users
     * const { count } = await prisma.discord_users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends discord_usersDeleteManyArgs>(args?: SelectSubset<T, discord_usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Discord_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {discord_usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Discord_users
     * const discord_users = await prisma.discord_users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends discord_usersUpdateManyArgs>(args: SelectSubset<T, discord_usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Discord_users and returns the data updated in the database.
     * @param {discord_usersUpdateManyAndReturnArgs} args - Arguments to update many Discord_users.
     * @example
     * // Update many Discord_users
     * const discord_users = await prisma.discord_users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Discord_users and only return the `id`
     * const discord_usersWithIdOnly = await prisma.discord_users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends discord_usersUpdateManyAndReturnArgs>(args: SelectSubset<T, discord_usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Discord_users.
     * @param {discord_usersUpsertArgs} args - Arguments to update or create a Discord_users.
     * @example
     * // Update or create a Discord_users
     * const discord_users = await prisma.discord_users.upsert({
     *   create: {
     *     // ... data to create a Discord_users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Discord_users we want to update
     *   }
     * })
     */
    upsert<T extends discord_usersUpsertArgs>(args: SelectSubset<T, discord_usersUpsertArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Discord_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {discord_usersCountArgs} args - Arguments to filter Discord_users to count.
     * @example
     * // Count the number of Discord_users
     * const count = await prisma.discord_users.count({
     *   where: {
     *     // ... the filter for the Discord_users we want to count
     *   }
     * })
    **/
    count<T extends discord_usersCountArgs>(
      args?: Subset<T, discord_usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Discord_usersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Discord_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Discord_usersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Discord_usersAggregateArgs>(args: Subset<T, Discord_usersAggregateArgs>): Prisma.PrismaPromise<GetDiscord_usersAggregateType<T>>

    /**
     * Group by Discord_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {discord_usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends discord_usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: discord_usersGroupByArgs['orderBy'] }
        : { orderBy?: discord_usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, discord_usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscord_usersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the discord_users model
   */
  readonly fields: discord_usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for discord_users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__discord_usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team_roles<T extends discord_users$team_rolesArgs<ExtArgs> = {}>(args?: Subset<T, discord_users$team_rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teams_teams_created_byTodiscord_users<T extends discord_users$teams_teams_created_byTodiscord_usersArgs<ExtArgs> = {}>(args?: Subset<T, discord_users$teams_teams_created_byTodiscord_usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teams_teams_ownerTodiscord_users<T extends discord_users$teams_teams_ownerTodiscord_usersArgs<ExtArgs> = {}>(args?: Subset<T, discord_users$teams_teams_ownerTodiscord_usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the discord_users model
   */
  interface discord_usersFieldRefs {
    readonly id: FieldRef<"discord_users", 'String'>
    readonly created_at: FieldRef<"discord_users", 'DateTime'>
    readonly language: FieldRef<"discord_users", 'language'>
  }
    

  // Custom InputTypes
  /**
   * discord_users findUnique
   */
  export type discord_usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    /**
     * Filter, which discord_users to fetch.
     */
    where: discord_usersWhereUniqueInput
  }

  /**
   * discord_users findUniqueOrThrow
   */
  export type discord_usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    /**
     * Filter, which discord_users to fetch.
     */
    where: discord_usersWhereUniqueInput
  }

  /**
   * discord_users findFirst
   */
  export type discord_usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    /**
     * Filter, which discord_users to fetch.
     */
    where?: discord_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of discord_users to fetch.
     */
    orderBy?: discord_usersOrderByWithRelationInput | discord_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for discord_users.
     */
    cursor?: discord_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` discord_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` discord_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of discord_users.
     */
    distinct?: Discord_usersScalarFieldEnum | Discord_usersScalarFieldEnum[]
  }

  /**
   * discord_users findFirstOrThrow
   */
  export type discord_usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    /**
     * Filter, which discord_users to fetch.
     */
    where?: discord_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of discord_users to fetch.
     */
    orderBy?: discord_usersOrderByWithRelationInput | discord_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for discord_users.
     */
    cursor?: discord_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` discord_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` discord_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of discord_users.
     */
    distinct?: Discord_usersScalarFieldEnum | Discord_usersScalarFieldEnum[]
  }

  /**
   * discord_users findMany
   */
  export type discord_usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    /**
     * Filter, which discord_users to fetch.
     */
    where?: discord_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of discord_users to fetch.
     */
    orderBy?: discord_usersOrderByWithRelationInput | discord_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing discord_users.
     */
    cursor?: discord_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` discord_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` discord_users.
     */
    skip?: number
    distinct?: Discord_usersScalarFieldEnum | Discord_usersScalarFieldEnum[]
  }

  /**
   * discord_users create
   */
  export type discord_usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    /**
     * The data needed to create a discord_users.
     */
    data: XOR<discord_usersCreateInput, discord_usersUncheckedCreateInput>
  }

  /**
   * discord_users createMany
   */
  export type discord_usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many discord_users.
     */
    data: discord_usersCreateManyInput | discord_usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * discord_users createManyAndReturn
   */
  export type discord_usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * The data used to create many discord_users.
     */
    data: discord_usersCreateManyInput | discord_usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * discord_users update
   */
  export type discord_usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    /**
     * The data needed to update a discord_users.
     */
    data: XOR<discord_usersUpdateInput, discord_usersUncheckedUpdateInput>
    /**
     * Choose, which discord_users to update.
     */
    where: discord_usersWhereUniqueInput
  }

  /**
   * discord_users updateMany
   */
  export type discord_usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update discord_users.
     */
    data: XOR<discord_usersUpdateManyMutationInput, discord_usersUncheckedUpdateManyInput>
    /**
     * Filter which discord_users to update
     */
    where?: discord_usersWhereInput
    /**
     * Limit how many discord_users to update.
     */
    limit?: number
  }

  /**
   * discord_users updateManyAndReturn
   */
  export type discord_usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * The data used to update discord_users.
     */
    data: XOR<discord_usersUpdateManyMutationInput, discord_usersUncheckedUpdateManyInput>
    /**
     * Filter which discord_users to update
     */
    where?: discord_usersWhereInput
    /**
     * Limit how many discord_users to update.
     */
    limit?: number
  }

  /**
   * discord_users upsert
   */
  export type discord_usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    /**
     * The filter to search for the discord_users to update in case it exists.
     */
    where: discord_usersWhereUniqueInput
    /**
     * In case the discord_users found by the `where` argument doesn't exist, create a new discord_users with this data.
     */
    create: XOR<discord_usersCreateInput, discord_usersUncheckedCreateInput>
    /**
     * In case the discord_users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<discord_usersUpdateInput, discord_usersUncheckedUpdateInput>
  }

  /**
   * discord_users delete
   */
  export type discord_usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    /**
     * Filter which discord_users to delete.
     */
    where: discord_usersWhereUniqueInput
  }

  /**
   * discord_users deleteMany
   */
  export type discord_usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which discord_users to delete
     */
    where?: discord_usersWhereInput
    /**
     * Limit how many discord_users to delete.
     */
    limit?: number
  }

  /**
   * discord_users.team_roles
   */
  export type discord_users$team_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    where?: team_rolesWhereInput
    orderBy?: team_rolesOrderByWithRelationInput | team_rolesOrderByWithRelationInput[]
    cursor?: team_rolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Team_rolesScalarFieldEnum | Team_rolesScalarFieldEnum[]
  }

  /**
   * discord_users.teams_teams_created_byTodiscord_users
   */
  export type discord_users$teams_teams_created_byTodiscord_usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    where?: teamsWhereInput
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    cursor?: teamsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamsScalarFieldEnum | TeamsScalarFieldEnum[]
  }

  /**
   * discord_users.teams_teams_ownerTodiscord_users
   */
  export type discord_users$teams_teams_ownerTodiscord_usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    where?: teamsWhereInput
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    cursor?: teamsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamsScalarFieldEnum | TeamsScalarFieldEnum[]
  }

  /**
   * discord_users without action
   */
  export type discord_usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
  }


  /**
   * Model guilds
   */

  export type AggregateGuilds = {
    _count: GuildsCountAggregateOutputType | null
    _min: GuildsMinAggregateOutputType | null
    _max: GuildsMaxAggregateOutputType | null
  }

  export type GuildsMinAggregateOutputType = {
    id: string | null
    joined_at: Date | null
    language: $Enums.language | null
  }

  export type GuildsMaxAggregateOutputType = {
    id: string | null
    joined_at: Date | null
    language: $Enums.language | null
  }

  export type GuildsCountAggregateOutputType = {
    id: number
    joined_at: number
    language: number
    _all: number
  }


  export type GuildsMinAggregateInputType = {
    id?: true
    joined_at?: true
    language?: true
  }

  export type GuildsMaxAggregateInputType = {
    id?: true
    joined_at?: true
    language?: true
  }

  export type GuildsCountAggregateInputType = {
    id?: true
    joined_at?: true
    language?: true
    _all?: true
  }

  export type GuildsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which guilds to aggregate.
     */
    where?: guildsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guilds to fetch.
     */
    orderBy?: guildsOrderByWithRelationInput | guildsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: guildsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned guilds
    **/
    _count?: true | GuildsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuildsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuildsMaxAggregateInputType
  }

  export type GetGuildsAggregateType<T extends GuildsAggregateArgs> = {
        [P in keyof T & keyof AggregateGuilds]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuilds[P]>
      : GetScalarType<T[P], AggregateGuilds[P]>
  }




  export type guildsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: guildsWhereInput
    orderBy?: guildsOrderByWithAggregationInput | guildsOrderByWithAggregationInput[]
    by: GuildsScalarFieldEnum[] | GuildsScalarFieldEnum
    having?: guildsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuildsCountAggregateInputType | true
    _min?: GuildsMinAggregateInputType
    _max?: GuildsMaxAggregateInputType
  }

  export type GuildsGroupByOutputType = {
    id: string
    joined_at: Date
    language: $Enums.language | null
    _count: GuildsCountAggregateOutputType | null
    _min: GuildsMinAggregateOutputType | null
    _max: GuildsMaxAggregateOutputType | null
  }

  type GetGuildsGroupByPayload<T extends guildsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuildsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuildsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuildsGroupByOutputType[P]>
            : GetScalarType<T[P], GuildsGroupByOutputType[P]>
        }
      >
    >


  export type guildsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    joined_at?: boolean
    language?: boolean
  }, ExtArgs["result"]["guilds"]>

  export type guildsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    joined_at?: boolean
    language?: boolean
  }, ExtArgs["result"]["guilds"]>

  export type guildsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    joined_at?: boolean
    language?: boolean
  }, ExtArgs["result"]["guilds"]>

  export type guildsSelectScalar = {
    id?: boolean
    joined_at?: boolean
    language?: boolean
  }

  export type guildsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "joined_at" | "language", ExtArgs["result"]["guilds"]>

  export type $guildsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "guilds"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      joined_at: Date
      language: $Enums.language | null
    }, ExtArgs["result"]["guilds"]>
    composites: {}
  }

  type guildsGetPayload<S extends boolean | null | undefined | guildsDefaultArgs> = $Result.GetResult<Prisma.$guildsPayload, S>

  type guildsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<guildsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuildsCountAggregateInputType | true
    }

  export interface guildsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['guilds'], meta: { name: 'guilds' } }
    /**
     * Find zero or one Guilds that matches the filter.
     * @param {guildsFindUniqueArgs} args - Arguments to find a Guilds
     * @example
     * // Get one Guilds
     * const guilds = await prisma.guilds.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends guildsFindUniqueArgs>(args: SelectSubset<T, guildsFindUniqueArgs<ExtArgs>>): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Guilds that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {guildsFindUniqueOrThrowArgs} args - Arguments to find a Guilds
     * @example
     * // Get one Guilds
     * const guilds = await prisma.guilds.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends guildsFindUniqueOrThrowArgs>(args: SelectSubset<T, guildsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guilds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsFindFirstArgs} args - Arguments to find a Guilds
     * @example
     * // Get one Guilds
     * const guilds = await prisma.guilds.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends guildsFindFirstArgs>(args?: SelectSubset<T, guildsFindFirstArgs<ExtArgs>>): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guilds that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsFindFirstOrThrowArgs} args - Arguments to find a Guilds
     * @example
     * // Get one Guilds
     * const guilds = await prisma.guilds.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends guildsFindFirstOrThrowArgs>(args?: SelectSubset<T, guildsFindFirstOrThrowArgs<ExtArgs>>): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Guilds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guilds
     * const guilds = await prisma.guilds.findMany()
     * 
     * // Get first 10 Guilds
     * const guilds = await prisma.guilds.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guildsWithIdOnly = await prisma.guilds.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends guildsFindManyArgs>(args?: SelectSubset<T, guildsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Guilds.
     * @param {guildsCreateArgs} args - Arguments to create a Guilds.
     * @example
     * // Create one Guilds
     * const Guilds = await prisma.guilds.create({
     *   data: {
     *     // ... data to create a Guilds
     *   }
     * })
     * 
     */
    create<T extends guildsCreateArgs>(args: SelectSubset<T, guildsCreateArgs<ExtArgs>>): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Guilds.
     * @param {guildsCreateManyArgs} args - Arguments to create many Guilds.
     * @example
     * // Create many Guilds
     * const guilds = await prisma.guilds.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends guildsCreateManyArgs>(args?: SelectSubset<T, guildsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Guilds and returns the data saved in the database.
     * @param {guildsCreateManyAndReturnArgs} args - Arguments to create many Guilds.
     * @example
     * // Create many Guilds
     * const guilds = await prisma.guilds.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Guilds and only return the `id`
     * const guildsWithIdOnly = await prisma.guilds.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends guildsCreateManyAndReturnArgs>(args?: SelectSubset<T, guildsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Guilds.
     * @param {guildsDeleteArgs} args - Arguments to delete one Guilds.
     * @example
     * // Delete one Guilds
     * const Guilds = await prisma.guilds.delete({
     *   where: {
     *     // ... filter to delete one Guilds
     *   }
     * })
     * 
     */
    delete<T extends guildsDeleteArgs>(args: SelectSubset<T, guildsDeleteArgs<ExtArgs>>): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Guilds.
     * @param {guildsUpdateArgs} args - Arguments to update one Guilds.
     * @example
     * // Update one Guilds
     * const guilds = await prisma.guilds.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends guildsUpdateArgs>(args: SelectSubset<T, guildsUpdateArgs<ExtArgs>>): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Guilds.
     * @param {guildsDeleteManyArgs} args - Arguments to filter Guilds to delete.
     * @example
     * // Delete a few Guilds
     * const { count } = await prisma.guilds.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends guildsDeleteManyArgs>(args?: SelectSubset<T, guildsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guilds
     * const guilds = await prisma.guilds.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends guildsUpdateManyArgs>(args: SelectSubset<T, guildsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guilds and returns the data updated in the database.
     * @param {guildsUpdateManyAndReturnArgs} args - Arguments to update many Guilds.
     * @example
     * // Update many Guilds
     * const guilds = await prisma.guilds.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Guilds and only return the `id`
     * const guildsWithIdOnly = await prisma.guilds.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends guildsUpdateManyAndReturnArgs>(args: SelectSubset<T, guildsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Guilds.
     * @param {guildsUpsertArgs} args - Arguments to update or create a Guilds.
     * @example
     * // Update or create a Guilds
     * const guilds = await prisma.guilds.upsert({
     *   create: {
     *     // ... data to create a Guilds
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guilds we want to update
     *   }
     * })
     */
    upsert<T extends guildsUpsertArgs>(args: SelectSubset<T, guildsUpsertArgs<ExtArgs>>): Prisma__guildsClient<$Result.GetResult<Prisma.$guildsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsCountArgs} args - Arguments to filter Guilds to count.
     * @example
     * // Count the number of Guilds
     * const count = await prisma.guilds.count({
     *   where: {
     *     // ... the filter for the Guilds we want to count
     *   }
     * })
    **/
    count<T extends guildsCountArgs>(
      args?: Subset<T, guildsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuildsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuildsAggregateArgs>(args: Subset<T, GuildsAggregateArgs>): Prisma.PrismaPromise<GetGuildsAggregateType<T>>

    /**
     * Group by Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {guildsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends guildsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: guildsGroupByArgs['orderBy'] }
        : { orderBy?: guildsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, guildsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuildsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the guilds model
   */
  readonly fields: guildsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for guilds.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__guildsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the guilds model
   */
  interface guildsFieldRefs {
    readonly id: FieldRef<"guilds", 'String'>
    readonly joined_at: FieldRef<"guilds", 'DateTime'>
    readonly language: FieldRef<"guilds", 'language'>
  }
    

  // Custom InputTypes
  /**
   * guilds findUnique
   */
  export type guildsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * Filter, which guilds to fetch.
     */
    where: guildsWhereUniqueInput
  }

  /**
   * guilds findUniqueOrThrow
   */
  export type guildsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * Filter, which guilds to fetch.
     */
    where: guildsWhereUniqueInput
  }

  /**
   * guilds findFirst
   */
  export type guildsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * Filter, which guilds to fetch.
     */
    where?: guildsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guilds to fetch.
     */
    orderBy?: guildsOrderByWithRelationInput | guildsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for guilds.
     */
    cursor?: guildsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of guilds.
     */
    distinct?: GuildsScalarFieldEnum | GuildsScalarFieldEnum[]
  }

  /**
   * guilds findFirstOrThrow
   */
  export type guildsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * Filter, which guilds to fetch.
     */
    where?: guildsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guilds to fetch.
     */
    orderBy?: guildsOrderByWithRelationInput | guildsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for guilds.
     */
    cursor?: guildsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of guilds.
     */
    distinct?: GuildsScalarFieldEnum | GuildsScalarFieldEnum[]
  }

  /**
   * guilds findMany
   */
  export type guildsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * Filter, which guilds to fetch.
     */
    where?: guildsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of guilds to fetch.
     */
    orderBy?: guildsOrderByWithRelationInput | guildsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing guilds.
     */
    cursor?: guildsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` guilds.
     */
    skip?: number
    distinct?: GuildsScalarFieldEnum | GuildsScalarFieldEnum[]
  }

  /**
   * guilds create
   */
  export type guildsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * The data needed to create a guilds.
     */
    data: XOR<guildsCreateInput, guildsUncheckedCreateInput>
  }

  /**
   * guilds createMany
   */
  export type guildsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many guilds.
     */
    data: guildsCreateManyInput | guildsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * guilds createManyAndReturn
   */
  export type guildsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * The data used to create many guilds.
     */
    data: guildsCreateManyInput | guildsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * guilds update
   */
  export type guildsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * The data needed to update a guilds.
     */
    data: XOR<guildsUpdateInput, guildsUncheckedUpdateInput>
    /**
     * Choose, which guilds to update.
     */
    where: guildsWhereUniqueInput
  }

  /**
   * guilds updateMany
   */
  export type guildsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update guilds.
     */
    data: XOR<guildsUpdateManyMutationInput, guildsUncheckedUpdateManyInput>
    /**
     * Filter which guilds to update
     */
    where?: guildsWhereInput
    /**
     * Limit how many guilds to update.
     */
    limit?: number
  }

  /**
   * guilds updateManyAndReturn
   */
  export type guildsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * The data used to update guilds.
     */
    data: XOR<guildsUpdateManyMutationInput, guildsUncheckedUpdateManyInput>
    /**
     * Filter which guilds to update
     */
    where?: guildsWhereInput
    /**
     * Limit how many guilds to update.
     */
    limit?: number
  }

  /**
   * guilds upsert
   */
  export type guildsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * The filter to search for the guilds to update in case it exists.
     */
    where: guildsWhereUniqueInput
    /**
     * In case the guilds found by the `where` argument doesn't exist, create a new guilds with this data.
     */
    create: XOR<guildsCreateInput, guildsUncheckedCreateInput>
    /**
     * In case the guilds was found with the provided `where` argument, update it with this data.
     */
    update: XOR<guildsUpdateInput, guildsUncheckedUpdateInput>
  }

  /**
   * guilds delete
   */
  export type guildsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
    /**
     * Filter which guilds to delete.
     */
    where: guildsWhereUniqueInput
  }

  /**
   * guilds deleteMany
   */
  export type guildsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which guilds to delete
     */
    where?: guildsWhereInput
    /**
     * Limit how many guilds to delete.
     */
    limit?: number
  }

  /**
   * guilds without action
   */
  export type guildsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the guilds
     */
    select?: guildsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the guilds
     */
    omit?: guildsOmit<ExtArgs> | null
  }


  /**
   * Model team_roles
   */

  export type AggregateTeam_roles = {
    _count: Team_rolesCountAggregateOutputType | null
    _min: Team_rolesMinAggregateOutputType | null
    _max: Team_rolesMaxAggregateOutputType | null
  }

  export type Team_rolesMinAggregateOutputType = {
    team_id: string | null
    user_id: string | null
    created_at: Date | null
    role: $Enums.team_role | null
  }

  export type Team_rolesMaxAggregateOutputType = {
    team_id: string | null
    user_id: string | null
    created_at: Date | null
    role: $Enums.team_role | null
  }

  export type Team_rolesCountAggregateOutputType = {
    team_id: number
    user_id: number
    created_at: number
    role: number
    _all: number
  }


  export type Team_rolesMinAggregateInputType = {
    team_id?: true
    user_id?: true
    created_at?: true
    role?: true
  }

  export type Team_rolesMaxAggregateInputType = {
    team_id?: true
    user_id?: true
    created_at?: true
    role?: true
  }

  export type Team_rolesCountAggregateInputType = {
    team_id?: true
    user_id?: true
    created_at?: true
    role?: true
    _all?: true
  }

  export type Team_rolesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which team_roles to aggregate.
     */
    where?: team_rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of team_roles to fetch.
     */
    orderBy?: team_rolesOrderByWithRelationInput | team_rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: team_rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` team_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` team_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned team_roles
    **/
    _count?: true | Team_rolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Team_rolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Team_rolesMaxAggregateInputType
  }

  export type GetTeam_rolesAggregateType<T extends Team_rolesAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam_roles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam_roles[P]>
      : GetScalarType<T[P], AggregateTeam_roles[P]>
  }




  export type team_rolesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: team_rolesWhereInput
    orderBy?: team_rolesOrderByWithAggregationInput | team_rolesOrderByWithAggregationInput[]
    by: Team_rolesScalarFieldEnum[] | Team_rolesScalarFieldEnum
    having?: team_rolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Team_rolesCountAggregateInputType | true
    _min?: Team_rolesMinAggregateInputType
    _max?: Team_rolesMaxAggregateInputType
  }

  export type Team_rolesGroupByOutputType = {
    team_id: string
    user_id: string
    created_at: Date
    role: $Enums.team_role | null
    _count: Team_rolesCountAggregateOutputType | null
    _min: Team_rolesMinAggregateOutputType | null
    _max: Team_rolesMaxAggregateOutputType | null
  }

  type GetTeam_rolesGroupByPayload<T extends team_rolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Team_rolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Team_rolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Team_rolesGroupByOutputType[P]>
            : GetScalarType<T[P], Team_rolesGroupByOutputType[P]>
        }
      >
    >


  export type team_rolesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    team_id?: boolean
    user_id?: boolean
    created_at?: boolean
    role?: boolean
    teams?: boolean | teamsDefaultArgs<ExtArgs>
    discord_users?: boolean | discord_usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team_roles"]>

  export type team_rolesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    team_id?: boolean
    user_id?: boolean
    created_at?: boolean
    role?: boolean
    teams?: boolean | teamsDefaultArgs<ExtArgs>
    discord_users?: boolean | discord_usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team_roles"]>

  export type team_rolesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    team_id?: boolean
    user_id?: boolean
    created_at?: boolean
    role?: boolean
    teams?: boolean | teamsDefaultArgs<ExtArgs>
    discord_users?: boolean | discord_usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team_roles"]>

  export type team_rolesSelectScalar = {
    team_id?: boolean
    user_id?: boolean
    created_at?: boolean
    role?: boolean
  }

  export type team_rolesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"team_id" | "user_id" | "created_at" | "role", ExtArgs["result"]["team_roles"]>
  export type team_rolesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teams?: boolean | teamsDefaultArgs<ExtArgs>
    discord_users?: boolean | discord_usersDefaultArgs<ExtArgs>
  }
  export type team_rolesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teams?: boolean | teamsDefaultArgs<ExtArgs>
    discord_users?: boolean | discord_usersDefaultArgs<ExtArgs>
  }
  export type team_rolesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teams?: boolean | teamsDefaultArgs<ExtArgs>
    discord_users?: boolean | discord_usersDefaultArgs<ExtArgs>
  }

  export type $team_rolesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "team_roles"
    objects: {
      teams: Prisma.$teamsPayload<ExtArgs>
      discord_users: Prisma.$discord_usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      team_id: string
      user_id: string
      created_at: Date
      role: $Enums.team_role | null
    }, ExtArgs["result"]["team_roles"]>
    composites: {}
  }

  type team_rolesGetPayload<S extends boolean | null | undefined | team_rolesDefaultArgs> = $Result.GetResult<Prisma.$team_rolesPayload, S>

  type team_rolesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<team_rolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Team_rolesCountAggregateInputType | true
    }

  export interface team_rolesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['team_roles'], meta: { name: 'team_roles' } }
    /**
     * Find zero or one Team_roles that matches the filter.
     * @param {team_rolesFindUniqueArgs} args - Arguments to find a Team_roles
     * @example
     * // Get one Team_roles
     * const team_roles = await prisma.team_roles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends team_rolesFindUniqueArgs>(args: SelectSubset<T, team_rolesFindUniqueArgs<ExtArgs>>): Prisma__team_rolesClient<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team_roles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {team_rolesFindUniqueOrThrowArgs} args - Arguments to find a Team_roles
     * @example
     * // Get one Team_roles
     * const team_roles = await prisma.team_roles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends team_rolesFindUniqueOrThrowArgs>(args: SelectSubset<T, team_rolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__team_rolesClient<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team_roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {team_rolesFindFirstArgs} args - Arguments to find a Team_roles
     * @example
     * // Get one Team_roles
     * const team_roles = await prisma.team_roles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends team_rolesFindFirstArgs>(args?: SelectSubset<T, team_rolesFindFirstArgs<ExtArgs>>): Prisma__team_rolesClient<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team_roles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {team_rolesFindFirstOrThrowArgs} args - Arguments to find a Team_roles
     * @example
     * // Get one Team_roles
     * const team_roles = await prisma.team_roles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends team_rolesFindFirstOrThrowArgs>(args?: SelectSubset<T, team_rolesFindFirstOrThrowArgs<ExtArgs>>): Prisma__team_rolesClient<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Team_roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {team_rolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Team_roles
     * const team_roles = await prisma.team_roles.findMany()
     * 
     * // Get first 10 Team_roles
     * const team_roles = await prisma.team_roles.findMany({ take: 10 })
     * 
     * // Only select the `team_id`
     * const team_rolesWithTeam_idOnly = await prisma.team_roles.findMany({ select: { team_id: true } })
     * 
     */
    findMany<T extends team_rolesFindManyArgs>(args?: SelectSubset<T, team_rolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team_roles.
     * @param {team_rolesCreateArgs} args - Arguments to create a Team_roles.
     * @example
     * // Create one Team_roles
     * const Team_roles = await prisma.team_roles.create({
     *   data: {
     *     // ... data to create a Team_roles
     *   }
     * })
     * 
     */
    create<T extends team_rolesCreateArgs>(args: SelectSubset<T, team_rolesCreateArgs<ExtArgs>>): Prisma__team_rolesClient<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Team_roles.
     * @param {team_rolesCreateManyArgs} args - Arguments to create many Team_roles.
     * @example
     * // Create many Team_roles
     * const team_roles = await prisma.team_roles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends team_rolesCreateManyArgs>(args?: SelectSubset<T, team_rolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Team_roles and returns the data saved in the database.
     * @param {team_rolesCreateManyAndReturnArgs} args - Arguments to create many Team_roles.
     * @example
     * // Create many Team_roles
     * const team_roles = await prisma.team_roles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Team_roles and only return the `team_id`
     * const team_rolesWithTeam_idOnly = await prisma.team_roles.createManyAndReturn({
     *   select: { team_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends team_rolesCreateManyAndReturnArgs>(args?: SelectSubset<T, team_rolesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Team_roles.
     * @param {team_rolesDeleteArgs} args - Arguments to delete one Team_roles.
     * @example
     * // Delete one Team_roles
     * const Team_roles = await prisma.team_roles.delete({
     *   where: {
     *     // ... filter to delete one Team_roles
     *   }
     * })
     * 
     */
    delete<T extends team_rolesDeleteArgs>(args: SelectSubset<T, team_rolesDeleteArgs<ExtArgs>>): Prisma__team_rolesClient<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team_roles.
     * @param {team_rolesUpdateArgs} args - Arguments to update one Team_roles.
     * @example
     * // Update one Team_roles
     * const team_roles = await prisma.team_roles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends team_rolesUpdateArgs>(args: SelectSubset<T, team_rolesUpdateArgs<ExtArgs>>): Prisma__team_rolesClient<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Team_roles.
     * @param {team_rolesDeleteManyArgs} args - Arguments to filter Team_roles to delete.
     * @example
     * // Delete a few Team_roles
     * const { count } = await prisma.team_roles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends team_rolesDeleteManyArgs>(args?: SelectSubset<T, team_rolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Team_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {team_rolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Team_roles
     * const team_roles = await prisma.team_roles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends team_rolesUpdateManyArgs>(args: SelectSubset<T, team_rolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Team_roles and returns the data updated in the database.
     * @param {team_rolesUpdateManyAndReturnArgs} args - Arguments to update many Team_roles.
     * @example
     * // Update many Team_roles
     * const team_roles = await prisma.team_roles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Team_roles and only return the `team_id`
     * const team_rolesWithTeam_idOnly = await prisma.team_roles.updateManyAndReturn({
     *   select: { team_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends team_rolesUpdateManyAndReturnArgs>(args: SelectSubset<T, team_rolesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Team_roles.
     * @param {team_rolesUpsertArgs} args - Arguments to update or create a Team_roles.
     * @example
     * // Update or create a Team_roles
     * const team_roles = await prisma.team_roles.upsert({
     *   create: {
     *     // ... data to create a Team_roles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team_roles we want to update
     *   }
     * })
     */
    upsert<T extends team_rolesUpsertArgs>(args: SelectSubset<T, team_rolesUpsertArgs<ExtArgs>>): Prisma__team_rolesClient<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Team_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {team_rolesCountArgs} args - Arguments to filter Team_roles to count.
     * @example
     * // Count the number of Team_roles
     * const count = await prisma.team_roles.count({
     *   where: {
     *     // ... the filter for the Team_roles we want to count
     *   }
     * })
    **/
    count<T extends team_rolesCountArgs>(
      args?: Subset<T, team_rolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Team_rolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Team_rolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Team_rolesAggregateArgs>(args: Subset<T, Team_rolesAggregateArgs>): Prisma.PrismaPromise<GetTeam_rolesAggregateType<T>>

    /**
     * Group by Team_roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {team_rolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends team_rolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: team_rolesGroupByArgs['orderBy'] }
        : { orderBy?: team_rolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, team_rolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeam_rolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the team_roles model
   */
  readonly fields: team_rolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for team_roles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__team_rolesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teams<T extends teamsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, teamsDefaultArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    discord_users<T extends discord_usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, discord_usersDefaultArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the team_roles model
   */
  interface team_rolesFieldRefs {
    readonly team_id: FieldRef<"team_roles", 'String'>
    readonly user_id: FieldRef<"team_roles", 'String'>
    readonly created_at: FieldRef<"team_roles", 'DateTime'>
    readonly role: FieldRef<"team_roles", 'team_role'>
  }
    

  // Custom InputTypes
  /**
   * team_roles findUnique
   */
  export type team_rolesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    /**
     * Filter, which team_roles to fetch.
     */
    where: team_rolesWhereUniqueInput
  }

  /**
   * team_roles findUniqueOrThrow
   */
  export type team_rolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    /**
     * Filter, which team_roles to fetch.
     */
    where: team_rolesWhereUniqueInput
  }

  /**
   * team_roles findFirst
   */
  export type team_rolesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    /**
     * Filter, which team_roles to fetch.
     */
    where?: team_rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of team_roles to fetch.
     */
    orderBy?: team_rolesOrderByWithRelationInput | team_rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for team_roles.
     */
    cursor?: team_rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` team_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` team_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of team_roles.
     */
    distinct?: Team_rolesScalarFieldEnum | Team_rolesScalarFieldEnum[]
  }

  /**
   * team_roles findFirstOrThrow
   */
  export type team_rolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    /**
     * Filter, which team_roles to fetch.
     */
    where?: team_rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of team_roles to fetch.
     */
    orderBy?: team_rolesOrderByWithRelationInput | team_rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for team_roles.
     */
    cursor?: team_rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` team_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` team_roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of team_roles.
     */
    distinct?: Team_rolesScalarFieldEnum | Team_rolesScalarFieldEnum[]
  }

  /**
   * team_roles findMany
   */
  export type team_rolesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    /**
     * Filter, which team_roles to fetch.
     */
    where?: team_rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of team_roles to fetch.
     */
    orderBy?: team_rolesOrderByWithRelationInput | team_rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing team_roles.
     */
    cursor?: team_rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` team_roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` team_roles.
     */
    skip?: number
    distinct?: Team_rolesScalarFieldEnum | Team_rolesScalarFieldEnum[]
  }

  /**
   * team_roles create
   */
  export type team_rolesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    /**
     * The data needed to create a team_roles.
     */
    data: XOR<team_rolesCreateInput, team_rolesUncheckedCreateInput>
  }

  /**
   * team_roles createMany
   */
  export type team_rolesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many team_roles.
     */
    data: team_rolesCreateManyInput | team_rolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * team_roles createManyAndReturn
   */
  export type team_rolesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * The data used to create many team_roles.
     */
    data: team_rolesCreateManyInput | team_rolesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * team_roles update
   */
  export type team_rolesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    /**
     * The data needed to update a team_roles.
     */
    data: XOR<team_rolesUpdateInput, team_rolesUncheckedUpdateInput>
    /**
     * Choose, which team_roles to update.
     */
    where: team_rolesWhereUniqueInput
  }

  /**
   * team_roles updateMany
   */
  export type team_rolesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update team_roles.
     */
    data: XOR<team_rolesUpdateManyMutationInput, team_rolesUncheckedUpdateManyInput>
    /**
     * Filter which team_roles to update
     */
    where?: team_rolesWhereInput
    /**
     * Limit how many team_roles to update.
     */
    limit?: number
  }

  /**
   * team_roles updateManyAndReturn
   */
  export type team_rolesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * The data used to update team_roles.
     */
    data: XOR<team_rolesUpdateManyMutationInput, team_rolesUncheckedUpdateManyInput>
    /**
     * Filter which team_roles to update
     */
    where?: team_rolesWhereInput
    /**
     * Limit how many team_roles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * team_roles upsert
   */
  export type team_rolesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    /**
     * The filter to search for the team_roles to update in case it exists.
     */
    where: team_rolesWhereUniqueInput
    /**
     * In case the team_roles found by the `where` argument doesn't exist, create a new team_roles with this data.
     */
    create: XOR<team_rolesCreateInput, team_rolesUncheckedCreateInput>
    /**
     * In case the team_roles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<team_rolesUpdateInput, team_rolesUncheckedUpdateInput>
  }

  /**
   * team_roles delete
   */
  export type team_rolesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    /**
     * Filter which team_roles to delete.
     */
    where: team_rolesWhereUniqueInput
  }

  /**
   * team_roles deleteMany
   */
  export type team_rolesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which team_roles to delete
     */
    where?: team_rolesWhereInput
    /**
     * Limit how many team_roles to delete.
     */
    limit?: number
  }

  /**
   * team_roles without action
   */
  export type team_rolesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
  }


  /**
   * Model teams
   */

  export type AggregateTeams = {
    _count: TeamsCountAggregateOutputType | null
    _min: TeamsMinAggregateOutputType | null
    _max: TeamsMaxAggregateOutputType | null
  }

  export type TeamsMinAggregateOutputType = {
    id: string | null
    name: string | null
    short_name: string | null
    created_at: Date | null
    created_by: string | null
    owner: string | null
  }

  export type TeamsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    short_name: string | null
    created_at: Date | null
    created_by: string | null
    owner: string | null
  }

  export type TeamsCountAggregateOutputType = {
    id: number
    name: number
    short_name: number
    created_at: number
    created_by: number
    owner: number
    _all: number
  }


  export type TeamsMinAggregateInputType = {
    id?: true
    name?: true
    short_name?: true
    created_at?: true
    created_by?: true
    owner?: true
  }

  export type TeamsMaxAggregateInputType = {
    id?: true
    name?: true
    short_name?: true
    created_at?: true
    created_by?: true
    owner?: true
  }

  export type TeamsCountAggregateInputType = {
    id?: true
    name?: true
    short_name?: true
    created_at?: true
    created_by?: true
    owner?: true
    _all?: true
  }

  export type TeamsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which teams to aggregate.
     */
    where?: teamsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of teams to fetch.
     */
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: teamsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned teams
    **/
    _count?: true | TeamsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamsMaxAggregateInputType
  }

  export type GetTeamsAggregateType<T extends TeamsAggregateArgs> = {
        [P in keyof T & keyof AggregateTeams]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeams[P]>
      : GetScalarType<T[P], AggregateTeams[P]>
  }




  export type teamsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: teamsWhereInput
    orderBy?: teamsOrderByWithAggregationInput | teamsOrderByWithAggregationInput[]
    by: TeamsScalarFieldEnum[] | TeamsScalarFieldEnum
    having?: teamsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamsCountAggregateInputType | true
    _min?: TeamsMinAggregateInputType
    _max?: TeamsMaxAggregateInputType
  }

  export type TeamsGroupByOutputType = {
    id: string
    name: string
    short_name: string
    created_at: Date
    created_by: string | null
    owner: string | null
    _count: TeamsCountAggregateOutputType | null
    _min: TeamsMinAggregateOutputType | null
    _max: TeamsMaxAggregateOutputType | null
  }

  type GetTeamsGroupByPayload<T extends teamsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamsGroupByOutputType[P]>
            : GetScalarType<T[P], TeamsGroupByOutputType[P]>
        }
      >
    >


  export type teamsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    short_name?: boolean
    created_at?: boolean
    created_by?: boolean
    owner?: boolean
    team_roles?: boolean | teams$team_rolesArgs<ExtArgs>
    discord_users_teams_created_byTodiscord_users?: boolean | teams$discord_users_teams_created_byTodiscord_usersArgs<ExtArgs>
    discord_users_teams_ownerTodiscord_users?: boolean | teams$discord_users_teams_ownerTodiscord_usersArgs<ExtArgs>
    _count?: boolean | TeamsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teams"]>

  export type teamsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    short_name?: boolean
    created_at?: boolean
    created_by?: boolean
    owner?: boolean
    discord_users_teams_created_byTodiscord_users?: boolean | teams$discord_users_teams_created_byTodiscord_usersArgs<ExtArgs>
    discord_users_teams_ownerTodiscord_users?: boolean | teams$discord_users_teams_ownerTodiscord_usersArgs<ExtArgs>
  }, ExtArgs["result"]["teams"]>

  export type teamsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    short_name?: boolean
    created_at?: boolean
    created_by?: boolean
    owner?: boolean
    discord_users_teams_created_byTodiscord_users?: boolean | teams$discord_users_teams_created_byTodiscord_usersArgs<ExtArgs>
    discord_users_teams_ownerTodiscord_users?: boolean | teams$discord_users_teams_ownerTodiscord_usersArgs<ExtArgs>
  }, ExtArgs["result"]["teams"]>

  export type teamsSelectScalar = {
    id?: boolean
    name?: boolean
    short_name?: boolean
    created_at?: boolean
    created_by?: boolean
    owner?: boolean
  }

  export type teamsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "short_name" | "created_at" | "created_by" | "owner", ExtArgs["result"]["teams"]>
  export type teamsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team_roles?: boolean | teams$team_rolesArgs<ExtArgs>
    discord_users_teams_created_byTodiscord_users?: boolean | teams$discord_users_teams_created_byTodiscord_usersArgs<ExtArgs>
    discord_users_teams_ownerTodiscord_users?: boolean | teams$discord_users_teams_ownerTodiscord_usersArgs<ExtArgs>
    _count?: boolean | TeamsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type teamsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discord_users_teams_created_byTodiscord_users?: boolean | teams$discord_users_teams_created_byTodiscord_usersArgs<ExtArgs>
    discord_users_teams_ownerTodiscord_users?: boolean | teams$discord_users_teams_ownerTodiscord_usersArgs<ExtArgs>
  }
  export type teamsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    discord_users_teams_created_byTodiscord_users?: boolean | teams$discord_users_teams_created_byTodiscord_usersArgs<ExtArgs>
    discord_users_teams_ownerTodiscord_users?: boolean | teams$discord_users_teams_ownerTodiscord_usersArgs<ExtArgs>
  }

  export type $teamsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "teams"
    objects: {
      team_roles: Prisma.$team_rolesPayload<ExtArgs>[]
      discord_users_teams_created_byTodiscord_users: Prisma.$discord_usersPayload<ExtArgs> | null
      discord_users_teams_ownerTodiscord_users: Prisma.$discord_usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      short_name: string
      created_at: Date
      created_by: string | null
      owner: string | null
    }, ExtArgs["result"]["teams"]>
    composites: {}
  }

  type teamsGetPayload<S extends boolean | null | undefined | teamsDefaultArgs> = $Result.GetResult<Prisma.$teamsPayload, S>

  type teamsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<teamsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamsCountAggregateInputType | true
    }

  export interface teamsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['teams'], meta: { name: 'teams' } }
    /**
     * Find zero or one Teams that matches the filter.
     * @param {teamsFindUniqueArgs} args - Arguments to find a Teams
     * @example
     * // Get one Teams
     * const teams = await prisma.teams.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends teamsFindUniqueArgs>(args: SelectSubset<T, teamsFindUniqueArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Teams that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {teamsFindUniqueOrThrowArgs} args - Arguments to find a Teams
     * @example
     * // Get one Teams
     * const teams = await prisma.teams.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends teamsFindUniqueOrThrowArgs>(args: SelectSubset<T, teamsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsFindFirstArgs} args - Arguments to find a Teams
     * @example
     * // Get one Teams
     * const teams = await prisma.teams.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends teamsFindFirstArgs>(args?: SelectSubset<T, teamsFindFirstArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teams that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsFindFirstOrThrowArgs} args - Arguments to find a Teams
     * @example
     * // Get one Teams
     * const teams = await prisma.teams.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends teamsFindFirstOrThrowArgs>(args?: SelectSubset<T, teamsFindFirstOrThrowArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.teams.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.teams.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamsWithIdOnly = await prisma.teams.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends teamsFindManyArgs>(args?: SelectSubset<T, teamsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Teams.
     * @param {teamsCreateArgs} args - Arguments to create a Teams.
     * @example
     * // Create one Teams
     * const Teams = await prisma.teams.create({
     *   data: {
     *     // ... data to create a Teams
     *   }
     * })
     * 
     */
    create<T extends teamsCreateArgs>(args: SelectSubset<T, teamsCreateArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {teamsCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const teams = await prisma.teams.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends teamsCreateManyArgs>(args?: SelectSubset<T, teamsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {teamsCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const teams = await prisma.teams.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamsWithIdOnly = await prisma.teams.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends teamsCreateManyAndReturnArgs>(args?: SelectSubset<T, teamsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Teams.
     * @param {teamsDeleteArgs} args - Arguments to delete one Teams.
     * @example
     * // Delete one Teams
     * const Teams = await prisma.teams.delete({
     *   where: {
     *     // ... filter to delete one Teams
     *   }
     * })
     * 
     */
    delete<T extends teamsDeleteArgs>(args: SelectSubset<T, teamsDeleteArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Teams.
     * @param {teamsUpdateArgs} args - Arguments to update one Teams.
     * @example
     * // Update one Teams
     * const teams = await prisma.teams.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends teamsUpdateArgs>(args: SelectSubset<T, teamsUpdateArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {teamsDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.teams.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends teamsDeleteManyArgs>(args?: SelectSubset<T, teamsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const teams = await prisma.teams.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends teamsUpdateManyArgs>(args: SelectSubset<T, teamsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {teamsUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const teams = await prisma.teams.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamsWithIdOnly = await prisma.teams.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends teamsUpdateManyAndReturnArgs>(args: SelectSubset<T, teamsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Teams.
     * @param {teamsUpsertArgs} args - Arguments to update or create a Teams.
     * @example
     * // Update or create a Teams
     * const teams = await prisma.teams.upsert({
     *   create: {
     *     // ... data to create a Teams
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teams we want to update
     *   }
     * })
     */
    upsert<T extends teamsUpsertArgs>(args: SelectSubset<T, teamsUpsertArgs<ExtArgs>>): Prisma__teamsClient<$Result.GetResult<Prisma.$teamsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.teams.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends teamsCountArgs>(
      args?: Subset<T, teamsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamsAggregateArgs>(args: Subset<T, TeamsAggregateArgs>): Prisma.PrismaPromise<GetTeamsAggregateType<T>>

    /**
     * Group by Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {teamsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends teamsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: teamsGroupByArgs['orderBy'] }
        : { orderBy?: teamsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, teamsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the teams model
   */
  readonly fields: teamsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for teams.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__teamsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team_roles<T extends teams$team_rolesArgs<ExtArgs> = {}>(args?: Subset<T, teams$team_rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$team_rolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    discord_users_teams_created_byTodiscord_users<T extends teams$discord_users_teams_created_byTodiscord_usersArgs<ExtArgs> = {}>(args?: Subset<T, teams$discord_users_teams_created_byTodiscord_usersArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    discord_users_teams_ownerTodiscord_users<T extends teams$discord_users_teams_ownerTodiscord_usersArgs<ExtArgs> = {}>(args?: Subset<T, teams$discord_users_teams_ownerTodiscord_usersArgs<ExtArgs>>): Prisma__discord_usersClient<$Result.GetResult<Prisma.$discord_usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the teams model
   */
  interface teamsFieldRefs {
    readonly id: FieldRef<"teams", 'String'>
    readonly name: FieldRef<"teams", 'String'>
    readonly short_name: FieldRef<"teams", 'String'>
    readonly created_at: FieldRef<"teams", 'DateTime'>
    readonly created_by: FieldRef<"teams", 'String'>
    readonly owner: FieldRef<"teams", 'String'>
  }
    

  // Custom InputTypes
  /**
   * teams findUnique
   */
  export type teamsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter, which teams to fetch.
     */
    where: teamsWhereUniqueInput
  }

  /**
   * teams findUniqueOrThrow
   */
  export type teamsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter, which teams to fetch.
     */
    where: teamsWhereUniqueInput
  }

  /**
   * teams findFirst
   */
  export type teamsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter, which teams to fetch.
     */
    where?: teamsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of teams to fetch.
     */
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for teams.
     */
    cursor?: teamsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of teams.
     */
    distinct?: TeamsScalarFieldEnum | TeamsScalarFieldEnum[]
  }

  /**
   * teams findFirstOrThrow
   */
  export type teamsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter, which teams to fetch.
     */
    where?: teamsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of teams to fetch.
     */
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for teams.
     */
    cursor?: teamsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of teams.
     */
    distinct?: TeamsScalarFieldEnum | TeamsScalarFieldEnum[]
  }

  /**
   * teams findMany
   */
  export type teamsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter, which teams to fetch.
     */
    where?: teamsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of teams to fetch.
     */
    orderBy?: teamsOrderByWithRelationInput | teamsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing teams.
     */
    cursor?: teamsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` teams.
     */
    skip?: number
    distinct?: TeamsScalarFieldEnum | TeamsScalarFieldEnum[]
  }

  /**
   * teams create
   */
  export type teamsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * The data needed to create a teams.
     */
    data: XOR<teamsCreateInput, teamsUncheckedCreateInput>
  }

  /**
   * teams createMany
   */
  export type teamsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many teams.
     */
    data: teamsCreateManyInput | teamsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * teams createManyAndReturn
   */
  export type teamsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * The data used to create many teams.
     */
    data: teamsCreateManyInput | teamsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * teams update
   */
  export type teamsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * The data needed to update a teams.
     */
    data: XOR<teamsUpdateInput, teamsUncheckedUpdateInput>
    /**
     * Choose, which teams to update.
     */
    where: teamsWhereUniqueInput
  }

  /**
   * teams updateMany
   */
  export type teamsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update teams.
     */
    data: XOR<teamsUpdateManyMutationInput, teamsUncheckedUpdateManyInput>
    /**
     * Filter which teams to update
     */
    where?: teamsWhereInput
    /**
     * Limit how many teams to update.
     */
    limit?: number
  }

  /**
   * teams updateManyAndReturn
   */
  export type teamsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * The data used to update teams.
     */
    data: XOR<teamsUpdateManyMutationInput, teamsUncheckedUpdateManyInput>
    /**
     * Filter which teams to update
     */
    where?: teamsWhereInput
    /**
     * Limit how many teams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * teams upsert
   */
  export type teamsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * The filter to search for the teams to update in case it exists.
     */
    where: teamsWhereUniqueInput
    /**
     * In case the teams found by the `where` argument doesn't exist, create a new teams with this data.
     */
    create: XOR<teamsCreateInput, teamsUncheckedCreateInput>
    /**
     * In case the teams was found with the provided `where` argument, update it with this data.
     */
    update: XOR<teamsUpdateInput, teamsUncheckedUpdateInput>
  }

  /**
   * teams delete
   */
  export type teamsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
    /**
     * Filter which teams to delete.
     */
    where: teamsWhereUniqueInput
  }

  /**
   * teams deleteMany
   */
  export type teamsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which teams to delete
     */
    where?: teamsWhereInput
    /**
     * Limit how many teams to delete.
     */
    limit?: number
  }

  /**
   * teams.team_roles
   */
  export type teams$team_rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the team_roles
     */
    select?: team_rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the team_roles
     */
    omit?: team_rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: team_rolesInclude<ExtArgs> | null
    where?: team_rolesWhereInput
    orderBy?: team_rolesOrderByWithRelationInput | team_rolesOrderByWithRelationInput[]
    cursor?: team_rolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Team_rolesScalarFieldEnum | Team_rolesScalarFieldEnum[]
  }

  /**
   * teams.discord_users_teams_created_byTodiscord_users
   */
  export type teams$discord_users_teams_created_byTodiscord_usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    where?: discord_usersWhereInput
  }

  /**
   * teams.discord_users_teams_ownerTodiscord_users
   */
  export type teams$discord_users_teams_ownerTodiscord_usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the discord_users
     */
    select?: discord_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the discord_users
     */
    omit?: discord_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: discord_usersInclude<ExtArgs> | null
    where?: discord_usersWhereInput
  }

  /**
   * teams without action
   */
  export type teamsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the teams
     */
    select?: teamsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the teams
     */
    omit?: teamsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: teamsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Discord_usersScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    language: 'language'
  };

  export type Discord_usersScalarFieldEnum = (typeof Discord_usersScalarFieldEnum)[keyof typeof Discord_usersScalarFieldEnum]


  export const GuildsScalarFieldEnum: {
    id: 'id',
    joined_at: 'joined_at',
    language: 'language'
  };

  export type GuildsScalarFieldEnum = (typeof GuildsScalarFieldEnum)[keyof typeof GuildsScalarFieldEnum]


  export const Team_rolesScalarFieldEnum: {
    team_id: 'team_id',
    user_id: 'user_id',
    created_at: 'created_at',
    role: 'role'
  };

  export type Team_rolesScalarFieldEnum = (typeof Team_rolesScalarFieldEnum)[keyof typeof Team_rolesScalarFieldEnum]


  export const TeamsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    short_name: 'short_name',
    created_at: 'created_at',
    created_by: 'created_by',
    owner: 'owner'
  };

  export type TeamsScalarFieldEnum = (typeof TeamsScalarFieldEnum)[keyof typeof TeamsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'language'
   */
  export type EnumlanguageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'language'>
    


  /**
   * Reference to a field of type 'language[]'
   */
  export type ListEnumlanguageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'language[]'>
    


  /**
   * Reference to a field of type 'team_role'
   */
  export type Enumteam_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'team_role'>
    


  /**
   * Reference to a field of type 'team_role[]'
   */
  export type ListEnumteam_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'team_role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type discord_usersWhereInput = {
    AND?: discord_usersWhereInput | discord_usersWhereInput[]
    OR?: discord_usersWhereInput[]
    NOT?: discord_usersWhereInput | discord_usersWhereInput[]
    id?: StringFilter<"discord_users"> | string
    created_at?: DateTimeFilter<"discord_users"> | Date | string
    language?: EnumlanguageNullableFilter<"discord_users"> | $Enums.language | null
    team_roles?: Team_rolesListRelationFilter
    teams_teams_created_byTodiscord_users?: TeamsListRelationFilter
    teams_teams_ownerTodiscord_users?: TeamsListRelationFilter
  }

  export type discord_usersOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    language?: SortOrderInput | SortOrder
    team_roles?: team_rolesOrderByRelationAggregateInput
    teams_teams_created_byTodiscord_users?: teamsOrderByRelationAggregateInput
    teams_teams_ownerTodiscord_users?: teamsOrderByRelationAggregateInput
  }

  export type discord_usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: discord_usersWhereInput | discord_usersWhereInput[]
    OR?: discord_usersWhereInput[]
    NOT?: discord_usersWhereInput | discord_usersWhereInput[]
    created_at?: DateTimeFilter<"discord_users"> | Date | string
    language?: EnumlanguageNullableFilter<"discord_users"> | $Enums.language | null
    team_roles?: Team_rolesListRelationFilter
    teams_teams_created_byTodiscord_users?: TeamsListRelationFilter
    teams_teams_ownerTodiscord_users?: TeamsListRelationFilter
  }, "id">

  export type discord_usersOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    language?: SortOrderInput | SortOrder
    _count?: discord_usersCountOrderByAggregateInput
    _max?: discord_usersMaxOrderByAggregateInput
    _min?: discord_usersMinOrderByAggregateInput
  }

  export type discord_usersScalarWhereWithAggregatesInput = {
    AND?: discord_usersScalarWhereWithAggregatesInput | discord_usersScalarWhereWithAggregatesInput[]
    OR?: discord_usersScalarWhereWithAggregatesInput[]
    NOT?: discord_usersScalarWhereWithAggregatesInput | discord_usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"discord_users"> | string
    created_at?: DateTimeWithAggregatesFilter<"discord_users"> | Date | string
    language?: EnumlanguageNullableWithAggregatesFilter<"discord_users"> | $Enums.language | null
  }

  export type guildsWhereInput = {
    AND?: guildsWhereInput | guildsWhereInput[]
    OR?: guildsWhereInput[]
    NOT?: guildsWhereInput | guildsWhereInput[]
    id?: StringFilter<"guilds"> | string
    joined_at?: DateTimeFilter<"guilds"> | Date | string
    language?: EnumlanguageNullableFilter<"guilds"> | $Enums.language | null
  }

  export type guildsOrderByWithRelationInput = {
    id?: SortOrder
    joined_at?: SortOrder
    language?: SortOrderInput | SortOrder
  }

  export type guildsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: guildsWhereInput | guildsWhereInput[]
    OR?: guildsWhereInput[]
    NOT?: guildsWhereInput | guildsWhereInput[]
    joined_at?: DateTimeFilter<"guilds"> | Date | string
    language?: EnumlanguageNullableFilter<"guilds"> | $Enums.language | null
  }, "id">

  export type guildsOrderByWithAggregationInput = {
    id?: SortOrder
    joined_at?: SortOrder
    language?: SortOrderInput | SortOrder
    _count?: guildsCountOrderByAggregateInput
    _max?: guildsMaxOrderByAggregateInput
    _min?: guildsMinOrderByAggregateInput
  }

  export type guildsScalarWhereWithAggregatesInput = {
    AND?: guildsScalarWhereWithAggregatesInput | guildsScalarWhereWithAggregatesInput[]
    OR?: guildsScalarWhereWithAggregatesInput[]
    NOT?: guildsScalarWhereWithAggregatesInput | guildsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"guilds"> | string
    joined_at?: DateTimeWithAggregatesFilter<"guilds"> | Date | string
    language?: EnumlanguageNullableWithAggregatesFilter<"guilds"> | $Enums.language | null
  }

  export type team_rolesWhereInput = {
    AND?: team_rolesWhereInput | team_rolesWhereInput[]
    OR?: team_rolesWhereInput[]
    NOT?: team_rolesWhereInput | team_rolesWhereInput[]
    team_id?: UuidFilter<"team_roles"> | string
    user_id?: StringFilter<"team_roles"> | string
    created_at?: DateTimeFilter<"team_roles"> | Date | string
    role?: Enumteam_roleNullableFilter<"team_roles"> | $Enums.team_role | null
    teams?: XOR<TeamsScalarRelationFilter, teamsWhereInput>
    discord_users?: XOR<Discord_usersScalarRelationFilter, discord_usersWhereInput>
  }

  export type team_rolesOrderByWithRelationInput = {
    team_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    role?: SortOrderInput | SortOrder
    teams?: teamsOrderByWithRelationInput
    discord_users?: discord_usersOrderByWithRelationInput
  }

  export type team_rolesWhereUniqueInput = Prisma.AtLeast<{
    team_id_user_id?: team_rolesTeam_idUser_idCompoundUniqueInput
    AND?: team_rolesWhereInput | team_rolesWhereInput[]
    OR?: team_rolesWhereInput[]
    NOT?: team_rolesWhereInput | team_rolesWhereInput[]
    team_id?: UuidFilter<"team_roles"> | string
    user_id?: StringFilter<"team_roles"> | string
    created_at?: DateTimeFilter<"team_roles"> | Date | string
    role?: Enumteam_roleNullableFilter<"team_roles"> | $Enums.team_role | null
    teams?: XOR<TeamsScalarRelationFilter, teamsWhereInput>
    discord_users?: XOR<Discord_usersScalarRelationFilter, discord_usersWhereInput>
  }, "team_id_user_id">

  export type team_rolesOrderByWithAggregationInput = {
    team_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    role?: SortOrderInput | SortOrder
    _count?: team_rolesCountOrderByAggregateInput
    _max?: team_rolesMaxOrderByAggregateInput
    _min?: team_rolesMinOrderByAggregateInput
  }

  export type team_rolesScalarWhereWithAggregatesInput = {
    AND?: team_rolesScalarWhereWithAggregatesInput | team_rolesScalarWhereWithAggregatesInput[]
    OR?: team_rolesScalarWhereWithAggregatesInput[]
    NOT?: team_rolesScalarWhereWithAggregatesInput | team_rolesScalarWhereWithAggregatesInput[]
    team_id?: UuidWithAggregatesFilter<"team_roles"> | string
    user_id?: StringWithAggregatesFilter<"team_roles"> | string
    created_at?: DateTimeWithAggregatesFilter<"team_roles"> | Date | string
    role?: Enumteam_roleNullableWithAggregatesFilter<"team_roles"> | $Enums.team_role | null
  }

  export type teamsWhereInput = {
    AND?: teamsWhereInput | teamsWhereInput[]
    OR?: teamsWhereInput[]
    NOT?: teamsWhereInput | teamsWhereInput[]
    id?: UuidFilter<"teams"> | string
    name?: StringFilter<"teams"> | string
    short_name?: StringFilter<"teams"> | string
    created_at?: DateTimeFilter<"teams"> | Date | string
    created_by?: StringNullableFilter<"teams"> | string | null
    owner?: StringNullableFilter<"teams"> | string | null
    team_roles?: Team_rolesListRelationFilter
    discord_users_teams_created_byTodiscord_users?: XOR<Discord_usersNullableScalarRelationFilter, discord_usersWhereInput> | null
    discord_users_teams_ownerTodiscord_users?: XOR<Discord_usersNullableScalarRelationFilter, discord_usersWhereInput> | null
  }

  export type teamsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    short_name?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrderInput | SortOrder
    owner?: SortOrderInput | SortOrder
    team_roles?: team_rolesOrderByRelationAggregateInput
    discord_users_teams_created_byTodiscord_users?: discord_usersOrderByWithRelationInput
    discord_users_teams_ownerTodiscord_users?: discord_usersOrderByWithRelationInput
  }

  export type teamsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: teamsWhereInput | teamsWhereInput[]
    OR?: teamsWhereInput[]
    NOT?: teamsWhereInput | teamsWhereInput[]
    name?: StringFilter<"teams"> | string
    short_name?: StringFilter<"teams"> | string
    created_at?: DateTimeFilter<"teams"> | Date | string
    created_by?: StringNullableFilter<"teams"> | string | null
    owner?: StringNullableFilter<"teams"> | string | null
    team_roles?: Team_rolesListRelationFilter
    discord_users_teams_created_byTodiscord_users?: XOR<Discord_usersNullableScalarRelationFilter, discord_usersWhereInput> | null
    discord_users_teams_ownerTodiscord_users?: XOR<Discord_usersNullableScalarRelationFilter, discord_usersWhereInput> | null
  }, "id">

  export type teamsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    short_name?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrderInput | SortOrder
    owner?: SortOrderInput | SortOrder
    _count?: teamsCountOrderByAggregateInput
    _max?: teamsMaxOrderByAggregateInput
    _min?: teamsMinOrderByAggregateInput
  }

  export type teamsScalarWhereWithAggregatesInput = {
    AND?: teamsScalarWhereWithAggregatesInput | teamsScalarWhereWithAggregatesInput[]
    OR?: teamsScalarWhereWithAggregatesInput[]
    NOT?: teamsScalarWhereWithAggregatesInput | teamsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"teams"> | string
    name?: StringWithAggregatesFilter<"teams"> | string
    short_name?: StringWithAggregatesFilter<"teams"> | string
    created_at?: DateTimeWithAggregatesFilter<"teams"> | Date | string
    created_by?: StringNullableWithAggregatesFilter<"teams"> | string | null
    owner?: StringNullableWithAggregatesFilter<"teams"> | string | null
  }

  export type discord_usersCreateInput = {
    id: string
    created_at?: Date | string
    language?: $Enums.language | null
    team_roles?: team_rolesCreateNestedManyWithoutDiscord_usersInput
    teams_teams_created_byTodiscord_users?: teamsCreateNestedManyWithoutDiscord_users_teams_created_byTodiscord_usersInput
    teams_teams_ownerTodiscord_users?: teamsCreateNestedManyWithoutDiscord_users_teams_ownerTodiscord_usersInput
  }

  export type discord_usersUncheckedCreateInput = {
    id: string
    created_at?: Date | string
    language?: $Enums.language | null
    team_roles?: team_rolesUncheckedCreateNestedManyWithoutDiscord_usersInput
    teams_teams_created_byTodiscord_users?: teamsUncheckedCreateNestedManyWithoutDiscord_users_teams_created_byTodiscord_usersInput
    teams_teams_ownerTodiscord_users?: teamsUncheckedCreateNestedManyWithoutDiscord_users_teams_ownerTodiscord_usersInput
  }

  export type discord_usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
    team_roles?: team_rolesUpdateManyWithoutDiscord_usersNestedInput
    teams_teams_created_byTodiscord_users?: teamsUpdateManyWithoutDiscord_users_teams_created_byTodiscord_usersNestedInput
    teams_teams_ownerTodiscord_users?: teamsUpdateManyWithoutDiscord_users_teams_ownerTodiscord_usersNestedInput
  }

  export type discord_usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
    team_roles?: team_rolesUncheckedUpdateManyWithoutDiscord_usersNestedInput
    teams_teams_created_byTodiscord_users?: teamsUncheckedUpdateManyWithoutDiscord_users_teams_created_byTodiscord_usersNestedInput
    teams_teams_ownerTodiscord_users?: teamsUncheckedUpdateManyWithoutDiscord_users_teams_ownerTodiscord_usersNestedInput
  }

  export type discord_usersCreateManyInput = {
    id: string
    created_at?: Date | string
    language?: $Enums.language | null
  }

  export type discord_usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
  }

  export type discord_usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
  }

  export type guildsCreateInput = {
    id: string
    joined_at?: Date | string
    language?: $Enums.language | null
  }

  export type guildsUncheckedCreateInput = {
    id: string
    joined_at?: Date | string
    language?: $Enums.language | null
  }

  export type guildsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
  }

  export type guildsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
  }

  export type guildsCreateManyInput = {
    id: string
    joined_at?: Date | string
    language?: $Enums.language | null
  }

  export type guildsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
  }

  export type guildsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
  }

  export type team_rolesCreateInput = {
    created_at?: Date | string
    role?: $Enums.team_role | null
    teams: teamsCreateNestedOneWithoutTeam_rolesInput
    discord_users: discord_usersCreateNestedOneWithoutTeam_rolesInput
  }

  export type team_rolesUncheckedCreateInput = {
    team_id: string
    user_id: string
    created_at?: Date | string
    role?: $Enums.team_role | null
  }

  export type team_rolesUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableEnumteam_roleFieldUpdateOperationsInput | $Enums.team_role | null
    teams?: teamsUpdateOneRequiredWithoutTeam_rolesNestedInput
    discord_users?: discord_usersUpdateOneRequiredWithoutTeam_rolesNestedInput
  }

  export type team_rolesUncheckedUpdateInput = {
    team_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableEnumteam_roleFieldUpdateOperationsInput | $Enums.team_role | null
  }

  export type team_rolesCreateManyInput = {
    team_id: string
    user_id: string
    created_at?: Date | string
    role?: $Enums.team_role | null
  }

  export type team_rolesUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableEnumteam_roleFieldUpdateOperationsInput | $Enums.team_role | null
  }

  export type team_rolesUncheckedUpdateManyInput = {
    team_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableEnumteam_roleFieldUpdateOperationsInput | $Enums.team_role | null
  }

  export type teamsCreateInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    team_roles?: team_rolesCreateNestedManyWithoutTeamsInput
    discord_users_teams_created_byTodiscord_users?: discord_usersCreateNestedOneWithoutTeams_teams_created_byTodiscord_usersInput
    discord_users_teams_ownerTodiscord_users?: discord_usersCreateNestedOneWithoutTeams_teams_ownerTodiscord_usersInput
  }

  export type teamsUncheckedCreateInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    created_by?: string | null
    owner?: string | null
    team_roles?: team_rolesUncheckedCreateNestedManyWithoutTeamsInput
  }

  export type teamsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    team_roles?: team_rolesUpdateManyWithoutTeamsNestedInput
    discord_users_teams_created_byTodiscord_users?: discord_usersUpdateOneWithoutTeams_teams_created_byTodiscord_usersNestedInput
    discord_users_teams_ownerTodiscord_users?: discord_usersUpdateOneWithoutTeams_teams_ownerTodiscord_usersNestedInput
  }

  export type teamsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    team_roles?: team_rolesUncheckedUpdateManyWithoutTeamsNestedInput
  }

  export type teamsCreateManyInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    created_by?: string | null
    owner?: string | null
  }

  export type teamsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type teamsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumlanguageNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.language | EnumlanguageFieldRefInput<$PrismaModel> | null
    in?: $Enums.language[] | ListEnumlanguageFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.language[] | ListEnumlanguageFieldRefInput<$PrismaModel> | null
    not?: NestedEnumlanguageNullableFilter<$PrismaModel> | $Enums.language | null
  }

  export type Team_rolesListRelationFilter = {
    every?: team_rolesWhereInput
    some?: team_rolesWhereInput
    none?: team_rolesWhereInput
  }

  export type TeamsListRelationFilter = {
    every?: teamsWhereInput
    some?: teamsWhereInput
    none?: teamsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type team_rolesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type teamsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type discord_usersCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    language?: SortOrder
  }

  export type discord_usersMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    language?: SortOrder
  }

  export type discord_usersMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    language?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumlanguageNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.language | EnumlanguageFieldRefInput<$PrismaModel> | null
    in?: $Enums.language[] | ListEnumlanguageFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.language[] | ListEnumlanguageFieldRefInput<$PrismaModel> | null
    not?: NestedEnumlanguageNullableWithAggregatesFilter<$PrismaModel> | $Enums.language | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumlanguageNullableFilter<$PrismaModel>
    _max?: NestedEnumlanguageNullableFilter<$PrismaModel>
  }

  export type guildsCountOrderByAggregateInput = {
    id?: SortOrder
    joined_at?: SortOrder
    language?: SortOrder
  }

  export type guildsMaxOrderByAggregateInput = {
    id?: SortOrder
    joined_at?: SortOrder
    language?: SortOrder
  }

  export type guildsMinOrderByAggregateInput = {
    id?: SortOrder
    joined_at?: SortOrder
    language?: SortOrder
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type Enumteam_roleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.team_role | Enumteam_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.team_role[] | ListEnumteam_roleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.team_role[] | ListEnumteam_roleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumteam_roleNullableFilter<$PrismaModel> | $Enums.team_role | null
  }

  export type TeamsScalarRelationFilter = {
    is?: teamsWhereInput
    isNot?: teamsWhereInput
  }

  export type Discord_usersScalarRelationFilter = {
    is?: discord_usersWhereInput
    isNot?: discord_usersWhereInput
  }

  export type team_rolesTeam_idUser_idCompoundUniqueInput = {
    team_id: string
    user_id: string
  }

  export type team_rolesCountOrderByAggregateInput = {
    team_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    role?: SortOrder
  }

  export type team_rolesMaxOrderByAggregateInput = {
    team_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    role?: SortOrder
  }

  export type team_rolesMinOrderByAggregateInput = {
    team_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    role?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type Enumteam_roleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.team_role | Enumteam_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.team_role[] | ListEnumteam_roleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.team_role[] | ListEnumteam_roleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumteam_roleNullableWithAggregatesFilter<$PrismaModel> | $Enums.team_role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumteam_roleNullableFilter<$PrismaModel>
    _max?: NestedEnumteam_roleNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Discord_usersNullableScalarRelationFilter = {
    is?: discord_usersWhereInput | null
    isNot?: discord_usersWhereInput | null
  }

  export type teamsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    short_name?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    owner?: SortOrder
  }

  export type teamsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    short_name?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    owner?: SortOrder
  }

  export type teamsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    short_name?: SortOrder
    created_at?: SortOrder
    created_by?: SortOrder
    owner?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type team_rolesCreateNestedManyWithoutDiscord_usersInput = {
    create?: XOR<team_rolesCreateWithoutDiscord_usersInput, team_rolesUncheckedCreateWithoutDiscord_usersInput> | team_rolesCreateWithoutDiscord_usersInput[] | team_rolesUncheckedCreateWithoutDiscord_usersInput[]
    connectOrCreate?: team_rolesCreateOrConnectWithoutDiscord_usersInput | team_rolesCreateOrConnectWithoutDiscord_usersInput[]
    createMany?: team_rolesCreateManyDiscord_usersInputEnvelope
    connect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
  }

  export type teamsCreateNestedManyWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    create?: XOR<teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput> | teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput[] | teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutDiscord_users_teams_created_byTodiscord_usersInput | teamsCreateOrConnectWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    createMany?: teamsCreateManyDiscord_users_teams_created_byTodiscord_usersInputEnvelope
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
  }

  export type teamsCreateNestedManyWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    create?: XOR<teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput> | teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput[] | teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutDiscord_users_teams_ownerTodiscord_usersInput | teamsCreateOrConnectWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    createMany?: teamsCreateManyDiscord_users_teams_ownerTodiscord_usersInputEnvelope
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
  }

  export type team_rolesUncheckedCreateNestedManyWithoutDiscord_usersInput = {
    create?: XOR<team_rolesCreateWithoutDiscord_usersInput, team_rolesUncheckedCreateWithoutDiscord_usersInput> | team_rolesCreateWithoutDiscord_usersInput[] | team_rolesUncheckedCreateWithoutDiscord_usersInput[]
    connectOrCreate?: team_rolesCreateOrConnectWithoutDiscord_usersInput | team_rolesCreateOrConnectWithoutDiscord_usersInput[]
    createMany?: team_rolesCreateManyDiscord_usersInputEnvelope
    connect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
  }

  export type teamsUncheckedCreateNestedManyWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    create?: XOR<teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput> | teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput[] | teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutDiscord_users_teams_created_byTodiscord_usersInput | teamsCreateOrConnectWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    createMany?: teamsCreateManyDiscord_users_teams_created_byTodiscord_usersInputEnvelope
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
  }

  export type teamsUncheckedCreateNestedManyWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    create?: XOR<teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput> | teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput[] | teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutDiscord_users_teams_ownerTodiscord_usersInput | teamsCreateOrConnectWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    createMany?: teamsCreateManyDiscord_users_teams_ownerTodiscord_usersInputEnvelope
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableEnumlanguageFieldUpdateOperationsInput = {
    set?: $Enums.language | null
  }

  export type team_rolesUpdateManyWithoutDiscord_usersNestedInput = {
    create?: XOR<team_rolesCreateWithoutDiscord_usersInput, team_rolesUncheckedCreateWithoutDiscord_usersInput> | team_rolesCreateWithoutDiscord_usersInput[] | team_rolesUncheckedCreateWithoutDiscord_usersInput[]
    connectOrCreate?: team_rolesCreateOrConnectWithoutDiscord_usersInput | team_rolesCreateOrConnectWithoutDiscord_usersInput[]
    upsert?: team_rolesUpsertWithWhereUniqueWithoutDiscord_usersInput | team_rolesUpsertWithWhereUniqueWithoutDiscord_usersInput[]
    createMany?: team_rolesCreateManyDiscord_usersInputEnvelope
    set?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    disconnect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    delete?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    connect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    update?: team_rolesUpdateWithWhereUniqueWithoutDiscord_usersInput | team_rolesUpdateWithWhereUniqueWithoutDiscord_usersInput[]
    updateMany?: team_rolesUpdateManyWithWhereWithoutDiscord_usersInput | team_rolesUpdateManyWithWhereWithoutDiscord_usersInput[]
    deleteMany?: team_rolesScalarWhereInput | team_rolesScalarWhereInput[]
  }

  export type teamsUpdateManyWithoutDiscord_users_teams_created_byTodiscord_usersNestedInput = {
    create?: XOR<teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput> | teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput[] | teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutDiscord_users_teams_created_byTodiscord_usersInput | teamsCreateOrConnectWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    upsert?: teamsUpsertWithWhereUniqueWithoutDiscord_users_teams_created_byTodiscord_usersInput | teamsUpsertWithWhereUniqueWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    createMany?: teamsCreateManyDiscord_users_teams_created_byTodiscord_usersInputEnvelope
    set?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    disconnect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    delete?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    update?: teamsUpdateWithWhereUniqueWithoutDiscord_users_teams_created_byTodiscord_usersInput | teamsUpdateWithWhereUniqueWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    updateMany?: teamsUpdateManyWithWhereWithoutDiscord_users_teams_created_byTodiscord_usersInput | teamsUpdateManyWithWhereWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    deleteMany?: teamsScalarWhereInput | teamsScalarWhereInput[]
  }

  export type teamsUpdateManyWithoutDiscord_users_teams_ownerTodiscord_usersNestedInput = {
    create?: XOR<teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput> | teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput[] | teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutDiscord_users_teams_ownerTodiscord_usersInput | teamsCreateOrConnectWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    upsert?: teamsUpsertWithWhereUniqueWithoutDiscord_users_teams_ownerTodiscord_usersInput | teamsUpsertWithWhereUniqueWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    createMany?: teamsCreateManyDiscord_users_teams_ownerTodiscord_usersInputEnvelope
    set?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    disconnect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    delete?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    update?: teamsUpdateWithWhereUniqueWithoutDiscord_users_teams_ownerTodiscord_usersInput | teamsUpdateWithWhereUniqueWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    updateMany?: teamsUpdateManyWithWhereWithoutDiscord_users_teams_ownerTodiscord_usersInput | teamsUpdateManyWithWhereWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    deleteMany?: teamsScalarWhereInput | teamsScalarWhereInput[]
  }

  export type team_rolesUncheckedUpdateManyWithoutDiscord_usersNestedInput = {
    create?: XOR<team_rolesCreateWithoutDiscord_usersInput, team_rolesUncheckedCreateWithoutDiscord_usersInput> | team_rolesCreateWithoutDiscord_usersInput[] | team_rolesUncheckedCreateWithoutDiscord_usersInput[]
    connectOrCreate?: team_rolesCreateOrConnectWithoutDiscord_usersInput | team_rolesCreateOrConnectWithoutDiscord_usersInput[]
    upsert?: team_rolesUpsertWithWhereUniqueWithoutDiscord_usersInput | team_rolesUpsertWithWhereUniqueWithoutDiscord_usersInput[]
    createMany?: team_rolesCreateManyDiscord_usersInputEnvelope
    set?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    disconnect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    delete?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    connect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    update?: team_rolesUpdateWithWhereUniqueWithoutDiscord_usersInput | team_rolesUpdateWithWhereUniqueWithoutDiscord_usersInput[]
    updateMany?: team_rolesUpdateManyWithWhereWithoutDiscord_usersInput | team_rolesUpdateManyWithWhereWithoutDiscord_usersInput[]
    deleteMany?: team_rolesScalarWhereInput | team_rolesScalarWhereInput[]
  }

  export type teamsUncheckedUpdateManyWithoutDiscord_users_teams_created_byTodiscord_usersNestedInput = {
    create?: XOR<teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput> | teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput[] | teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutDiscord_users_teams_created_byTodiscord_usersInput | teamsCreateOrConnectWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    upsert?: teamsUpsertWithWhereUniqueWithoutDiscord_users_teams_created_byTodiscord_usersInput | teamsUpsertWithWhereUniqueWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    createMany?: teamsCreateManyDiscord_users_teams_created_byTodiscord_usersInputEnvelope
    set?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    disconnect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    delete?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    update?: teamsUpdateWithWhereUniqueWithoutDiscord_users_teams_created_byTodiscord_usersInput | teamsUpdateWithWhereUniqueWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    updateMany?: teamsUpdateManyWithWhereWithoutDiscord_users_teams_created_byTodiscord_usersInput | teamsUpdateManyWithWhereWithoutDiscord_users_teams_created_byTodiscord_usersInput[]
    deleteMany?: teamsScalarWhereInput | teamsScalarWhereInput[]
  }

  export type teamsUncheckedUpdateManyWithoutDiscord_users_teams_ownerTodiscord_usersNestedInput = {
    create?: XOR<teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput> | teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput[] | teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    connectOrCreate?: teamsCreateOrConnectWithoutDiscord_users_teams_ownerTodiscord_usersInput | teamsCreateOrConnectWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    upsert?: teamsUpsertWithWhereUniqueWithoutDiscord_users_teams_ownerTodiscord_usersInput | teamsUpsertWithWhereUniqueWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    createMany?: teamsCreateManyDiscord_users_teams_ownerTodiscord_usersInputEnvelope
    set?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    disconnect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    delete?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    connect?: teamsWhereUniqueInput | teamsWhereUniqueInput[]
    update?: teamsUpdateWithWhereUniqueWithoutDiscord_users_teams_ownerTodiscord_usersInput | teamsUpdateWithWhereUniqueWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    updateMany?: teamsUpdateManyWithWhereWithoutDiscord_users_teams_ownerTodiscord_usersInput | teamsUpdateManyWithWhereWithoutDiscord_users_teams_ownerTodiscord_usersInput[]
    deleteMany?: teamsScalarWhereInput | teamsScalarWhereInput[]
  }

  export type teamsCreateNestedOneWithoutTeam_rolesInput = {
    create?: XOR<teamsCreateWithoutTeam_rolesInput, teamsUncheckedCreateWithoutTeam_rolesInput>
    connectOrCreate?: teamsCreateOrConnectWithoutTeam_rolesInput
    connect?: teamsWhereUniqueInput
  }

  export type discord_usersCreateNestedOneWithoutTeam_rolesInput = {
    create?: XOR<discord_usersCreateWithoutTeam_rolesInput, discord_usersUncheckedCreateWithoutTeam_rolesInput>
    connectOrCreate?: discord_usersCreateOrConnectWithoutTeam_rolesInput
    connect?: discord_usersWhereUniqueInput
  }

  export type NullableEnumteam_roleFieldUpdateOperationsInput = {
    set?: $Enums.team_role | null
  }

  export type teamsUpdateOneRequiredWithoutTeam_rolesNestedInput = {
    create?: XOR<teamsCreateWithoutTeam_rolesInput, teamsUncheckedCreateWithoutTeam_rolesInput>
    connectOrCreate?: teamsCreateOrConnectWithoutTeam_rolesInput
    upsert?: teamsUpsertWithoutTeam_rolesInput
    connect?: teamsWhereUniqueInput
    update?: XOR<XOR<teamsUpdateToOneWithWhereWithoutTeam_rolesInput, teamsUpdateWithoutTeam_rolesInput>, teamsUncheckedUpdateWithoutTeam_rolesInput>
  }

  export type discord_usersUpdateOneRequiredWithoutTeam_rolesNestedInput = {
    create?: XOR<discord_usersCreateWithoutTeam_rolesInput, discord_usersUncheckedCreateWithoutTeam_rolesInput>
    connectOrCreate?: discord_usersCreateOrConnectWithoutTeam_rolesInput
    upsert?: discord_usersUpsertWithoutTeam_rolesInput
    connect?: discord_usersWhereUniqueInput
    update?: XOR<XOR<discord_usersUpdateToOneWithWhereWithoutTeam_rolesInput, discord_usersUpdateWithoutTeam_rolesInput>, discord_usersUncheckedUpdateWithoutTeam_rolesInput>
  }

  export type team_rolesCreateNestedManyWithoutTeamsInput = {
    create?: XOR<team_rolesCreateWithoutTeamsInput, team_rolesUncheckedCreateWithoutTeamsInput> | team_rolesCreateWithoutTeamsInput[] | team_rolesUncheckedCreateWithoutTeamsInput[]
    connectOrCreate?: team_rolesCreateOrConnectWithoutTeamsInput | team_rolesCreateOrConnectWithoutTeamsInput[]
    createMany?: team_rolesCreateManyTeamsInputEnvelope
    connect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
  }

  export type discord_usersCreateNestedOneWithoutTeams_teams_created_byTodiscord_usersInput = {
    create?: XOR<discord_usersCreateWithoutTeams_teams_created_byTodiscord_usersInput, discord_usersUncheckedCreateWithoutTeams_teams_created_byTodiscord_usersInput>
    connectOrCreate?: discord_usersCreateOrConnectWithoutTeams_teams_created_byTodiscord_usersInput
    connect?: discord_usersWhereUniqueInput
  }

  export type discord_usersCreateNestedOneWithoutTeams_teams_ownerTodiscord_usersInput = {
    create?: XOR<discord_usersCreateWithoutTeams_teams_ownerTodiscord_usersInput, discord_usersUncheckedCreateWithoutTeams_teams_ownerTodiscord_usersInput>
    connectOrCreate?: discord_usersCreateOrConnectWithoutTeams_teams_ownerTodiscord_usersInput
    connect?: discord_usersWhereUniqueInput
  }

  export type team_rolesUncheckedCreateNestedManyWithoutTeamsInput = {
    create?: XOR<team_rolesCreateWithoutTeamsInput, team_rolesUncheckedCreateWithoutTeamsInput> | team_rolesCreateWithoutTeamsInput[] | team_rolesUncheckedCreateWithoutTeamsInput[]
    connectOrCreate?: team_rolesCreateOrConnectWithoutTeamsInput | team_rolesCreateOrConnectWithoutTeamsInput[]
    createMany?: team_rolesCreateManyTeamsInputEnvelope
    connect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
  }

  export type team_rolesUpdateManyWithoutTeamsNestedInput = {
    create?: XOR<team_rolesCreateWithoutTeamsInput, team_rolesUncheckedCreateWithoutTeamsInput> | team_rolesCreateWithoutTeamsInput[] | team_rolesUncheckedCreateWithoutTeamsInput[]
    connectOrCreate?: team_rolesCreateOrConnectWithoutTeamsInput | team_rolesCreateOrConnectWithoutTeamsInput[]
    upsert?: team_rolesUpsertWithWhereUniqueWithoutTeamsInput | team_rolesUpsertWithWhereUniqueWithoutTeamsInput[]
    createMany?: team_rolesCreateManyTeamsInputEnvelope
    set?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    disconnect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    delete?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    connect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    update?: team_rolesUpdateWithWhereUniqueWithoutTeamsInput | team_rolesUpdateWithWhereUniqueWithoutTeamsInput[]
    updateMany?: team_rolesUpdateManyWithWhereWithoutTeamsInput | team_rolesUpdateManyWithWhereWithoutTeamsInput[]
    deleteMany?: team_rolesScalarWhereInput | team_rolesScalarWhereInput[]
  }

  export type discord_usersUpdateOneWithoutTeams_teams_created_byTodiscord_usersNestedInput = {
    create?: XOR<discord_usersCreateWithoutTeams_teams_created_byTodiscord_usersInput, discord_usersUncheckedCreateWithoutTeams_teams_created_byTodiscord_usersInput>
    connectOrCreate?: discord_usersCreateOrConnectWithoutTeams_teams_created_byTodiscord_usersInput
    upsert?: discord_usersUpsertWithoutTeams_teams_created_byTodiscord_usersInput
    disconnect?: discord_usersWhereInput | boolean
    delete?: discord_usersWhereInput | boolean
    connect?: discord_usersWhereUniqueInput
    update?: XOR<XOR<discord_usersUpdateToOneWithWhereWithoutTeams_teams_created_byTodiscord_usersInput, discord_usersUpdateWithoutTeams_teams_created_byTodiscord_usersInput>, discord_usersUncheckedUpdateWithoutTeams_teams_created_byTodiscord_usersInput>
  }

  export type discord_usersUpdateOneWithoutTeams_teams_ownerTodiscord_usersNestedInput = {
    create?: XOR<discord_usersCreateWithoutTeams_teams_ownerTodiscord_usersInput, discord_usersUncheckedCreateWithoutTeams_teams_ownerTodiscord_usersInput>
    connectOrCreate?: discord_usersCreateOrConnectWithoutTeams_teams_ownerTodiscord_usersInput
    upsert?: discord_usersUpsertWithoutTeams_teams_ownerTodiscord_usersInput
    disconnect?: discord_usersWhereInput | boolean
    delete?: discord_usersWhereInput | boolean
    connect?: discord_usersWhereUniqueInput
    update?: XOR<XOR<discord_usersUpdateToOneWithWhereWithoutTeams_teams_ownerTodiscord_usersInput, discord_usersUpdateWithoutTeams_teams_ownerTodiscord_usersInput>, discord_usersUncheckedUpdateWithoutTeams_teams_ownerTodiscord_usersInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type team_rolesUncheckedUpdateManyWithoutTeamsNestedInput = {
    create?: XOR<team_rolesCreateWithoutTeamsInput, team_rolesUncheckedCreateWithoutTeamsInput> | team_rolesCreateWithoutTeamsInput[] | team_rolesUncheckedCreateWithoutTeamsInput[]
    connectOrCreate?: team_rolesCreateOrConnectWithoutTeamsInput | team_rolesCreateOrConnectWithoutTeamsInput[]
    upsert?: team_rolesUpsertWithWhereUniqueWithoutTeamsInput | team_rolesUpsertWithWhereUniqueWithoutTeamsInput[]
    createMany?: team_rolesCreateManyTeamsInputEnvelope
    set?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    disconnect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    delete?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    connect?: team_rolesWhereUniqueInput | team_rolesWhereUniqueInput[]
    update?: team_rolesUpdateWithWhereUniqueWithoutTeamsInput | team_rolesUpdateWithWhereUniqueWithoutTeamsInput[]
    updateMany?: team_rolesUpdateManyWithWhereWithoutTeamsInput | team_rolesUpdateManyWithWhereWithoutTeamsInput[]
    deleteMany?: team_rolesScalarWhereInput | team_rolesScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumlanguageNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.language | EnumlanguageFieldRefInput<$PrismaModel> | null
    in?: $Enums.language[] | ListEnumlanguageFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.language[] | ListEnumlanguageFieldRefInput<$PrismaModel> | null
    not?: NestedEnumlanguageNullableFilter<$PrismaModel> | $Enums.language | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumlanguageNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.language | EnumlanguageFieldRefInput<$PrismaModel> | null
    in?: $Enums.language[] | ListEnumlanguageFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.language[] | ListEnumlanguageFieldRefInput<$PrismaModel> | null
    not?: NestedEnumlanguageNullableWithAggregatesFilter<$PrismaModel> | $Enums.language | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumlanguageNullableFilter<$PrismaModel>
    _max?: NestedEnumlanguageNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedEnumteam_roleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.team_role | Enumteam_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.team_role[] | ListEnumteam_roleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.team_role[] | ListEnumteam_roleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumteam_roleNullableFilter<$PrismaModel> | $Enums.team_role | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumteam_roleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.team_role | Enumteam_roleFieldRefInput<$PrismaModel> | null
    in?: $Enums.team_role[] | ListEnumteam_roleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.team_role[] | ListEnumteam_roleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumteam_roleNullableWithAggregatesFilter<$PrismaModel> | $Enums.team_role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumteam_roleNullableFilter<$PrismaModel>
    _max?: NestedEnumteam_roleNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type team_rolesCreateWithoutDiscord_usersInput = {
    created_at?: Date | string
    role?: $Enums.team_role | null
    teams: teamsCreateNestedOneWithoutTeam_rolesInput
  }

  export type team_rolesUncheckedCreateWithoutDiscord_usersInput = {
    team_id: string
    created_at?: Date | string
    role?: $Enums.team_role | null
  }

  export type team_rolesCreateOrConnectWithoutDiscord_usersInput = {
    where: team_rolesWhereUniqueInput
    create: XOR<team_rolesCreateWithoutDiscord_usersInput, team_rolesUncheckedCreateWithoutDiscord_usersInput>
  }

  export type team_rolesCreateManyDiscord_usersInputEnvelope = {
    data: team_rolesCreateManyDiscord_usersInput | team_rolesCreateManyDiscord_usersInput[]
    skipDuplicates?: boolean
  }

  export type teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    team_roles?: team_rolesCreateNestedManyWithoutTeamsInput
    discord_users_teams_ownerTodiscord_users?: discord_usersCreateNestedOneWithoutTeams_teams_ownerTodiscord_usersInput
  }

  export type teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    owner?: string | null
    team_roles?: team_rolesUncheckedCreateNestedManyWithoutTeamsInput
  }

  export type teamsCreateOrConnectWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    where: teamsWhereUniqueInput
    create: XOR<teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput>
  }

  export type teamsCreateManyDiscord_users_teams_created_byTodiscord_usersInputEnvelope = {
    data: teamsCreateManyDiscord_users_teams_created_byTodiscord_usersInput | teamsCreateManyDiscord_users_teams_created_byTodiscord_usersInput[]
    skipDuplicates?: boolean
  }

  export type teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    team_roles?: team_rolesCreateNestedManyWithoutTeamsInput
    discord_users_teams_created_byTodiscord_users?: discord_usersCreateNestedOneWithoutTeams_teams_created_byTodiscord_usersInput
  }

  export type teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    created_by?: string | null
    team_roles?: team_rolesUncheckedCreateNestedManyWithoutTeamsInput
  }

  export type teamsCreateOrConnectWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    where: teamsWhereUniqueInput
    create: XOR<teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput>
  }

  export type teamsCreateManyDiscord_users_teams_ownerTodiscord_usersInputEnvelope = {
    data: teamsCreateManyDiscord_users_teams_ownerTodiscord_usersInput | teamsCreateManyDiscord_users_teams_ownerTodiscord_usersInput[]
    skipDuplicates?: boolean
  }

  export type team_rolesUpsertWithWhereUniqueWithoutDiscord_usersInput = {
    where: team_rolesWhereUniqueInput
    update: XOR<team_rolesUpdateWithoutDiscord_usersInput, team_rolesUncheckedUpdateWithoutDiscord_usersInput>
    create: XOR<team_rolesCreateWithoutDiscord_usersInput, team_rolesUncheckedCreateWithoutDiscord_usersInput>
  }

  export type team_rolesUpdateWithWhereUniqueWithoutDiscord_usersInput = {
    where: team_rolesWhereUniqueInput
    data: XOR<team_rolesUpdateWithoutDiscord_usersInput, team_rolesUncheckedUpdateWithoutDiscord_usersInput>
  }

  export type team_rolesUpdateManyWithWhereWithoutDiscord_usersInput = {
    where: team_rolesScalarWhereInput
    data: XOR<team_rolesUpdateManyMutationInput, team_rolesUncheckedUpdateManyWithoutDiscord_usersInput>
  }

  export type team_rolesScalarWhereInput = {
    AND?: team_rolesScalarWhereInput | team_rolesScalarWhereInput[]
    OR?: team_rolesScalarWhereInput[]
    NOT?: team_rolesScalarWhereInput | team_rolesScalarWhereInput[]
    team_id?: UuidFilter<"team_roles"> | string
    user_id?: StringFilter<"team_roles"> | string
    created_at?: DateTimeFilter<"team_roles"> | Date | string
    role?: Enumteam_roleNullableFilter<"team_roles"> | $Enums.team_role | null
  }

  export type teamsUpsertWithWhereUniqueWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    where: teamsWhereUniqueInput
    update: XOR<teamsUpdateWithoutDiscord_users_teams_created_byTodiscord_usersInput, teamsUncheckedUpdateWithoutDiscord_users_teams_created_byTodiscord_usersInput>
    create: XOR<teamsCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_created_byTodiscord_usersInput>
  }

  export type teamsUpdateWithWhereUniqueWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    where: teamsWhereUniqueInput
    data: XOR<teamsUpdateWithoutDiscord_users_teams_created_byTodiscord_usersInput, teamsUncheckedUpdateWithoutDiscord_users_teams_created_byTodiscord_usersInput>
  }

  export type teamsUpdateManyWithWhereWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    where: teamsScalarWhereInput
    data: XOR<teamsUpdateManyMutationInput, teamsUncheckedUpdateManyWithoutDiscord_users_teams_created_byTodiscord_usersInput>
  }

  export type teamsScalarWhereInput = {
    AND?: teamsScalarWhereInput | teamsScalarWhereInput[]
    OR?: teamsScalarWhereInput[]
    NOT?: teamsScalarWhereInput | teamsScalarWhereInput[]
    id?: UuidFilter<"teams"> | string
    name?: StringFilter<"teams"> | string
    short_name?: StringFilter<"teams"> | string
    created_at?: DateTimeFilter<"teams"> | Date | string
    created_by?: StringNullableFilter<"teams"> | string | null
    owner?: StringNullableFilter<"teams"> | string | null
  }

  export type teamsUpsertWithWhereUniqueWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    where: teamsWhereUniqueInput
    update: XOR<teamsUpdateWithoutDiscord_users_teams_ownerTodiscord_usersInput, teamsUncheckedUpdateWithoutDiscord_users_teams_ownerTodiscord_usersInput>
    create: XOR<teamsCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput, teamsUncheckedCreateWithoutDiscord_users_teams_ownerTodiscord_usersInput>
  }

  export type teamsUpdateWithWhereUniqueWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    where: teamsWhereUniqueInput
    data: XOR<teamsUpdateWithoutDiscord_users_teams_ownerTodiscord_usersInput, teamsUncheckedUpdateWithoutDiscord_users_teams_ownerTodiscord_usersInput>
  }

  export type teamsUpdateManyWithWhereWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    where: teamsScalarWhereInput
    data: XOR<teamsUpdateManyMutationInput, teamsUncheckedUpdateManyWithoutDiscord_users_teams_ownerTodiscord_usersInput>
  }

  export type teamsCreateWithoutTeam_rolesInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    discord_users_teams_created_byTodiscord_users?: discord_usersCreateNestedOneWithoutTeams_teams_created_byTodiscord_usersInput
    discord_users_teams_ownerTodiscord_users?: discord_usersCreateNestedOneWithoutTeams_teams_ownerTodiscord_usersInput
  }

  export type teamsUncheckedCreateWithoutTeam_rolesInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    created_by?: string | null
    owner?: string | null
  }

  export type teamsCreateOrConnectWithoutTeam_rolesInput = {
    where: teamsWhereUniqueInput
    create: XOR<teamsCreateWithoutTeam_rolesInput, teamsUncheckedCreateWithoutTeam_rolesInput>
  }

  export type discord_usersCreateWithoutTeam_rolesInput = {
    id: string
    created_at?: Date | string
    language?: $Enums.language | null
    teams_teams_created_byTodiscord_users?: teamsCreateNestedManyWithoutDiscord_users_teams_created_byTodiscord_usersInput
    teams_teams_ownerTodiscord_users?: teamsCreateNestedManyWithoutDiscord_users_teams_ownerTodiscord_usersInput
  }

  export type discord_usersUncheckedCreateWithoutTeam_rolesInput = {
    id: string
    created_at?: Date | string
    language?: $Enums.language | null
    teams_teams_created_byTodiscord_users?: teamsUncheckedCreateNestedManyWithoutDiscord_users_teams_created_byTodiscord_usersInput
    teams_teams_ownerTodiscord_users?: teamsUncheckedCreateNestedManyWithoutDiscord_users_teams_ownerTodiscord_usersInput
  }

  export type discord_usersCreateOrConnectWithoutTeam_rolesInput = {
    where: discord_usersWhereUniqueInput
    create: XOR<discord_usersCreateWithoutTeam_rolesInput, discord_usersUncheckedCreateWithoutTeam_rolesInput>
  }

  export type teamsUpsertWithoutTeam_rolesInput = {
    update: XOR<teamsUpdateWithoutTeam_rolesInput, teamsUncheckedUpdateWithoutTeam_rolesInput>
    create: XOR<teamsCreateWithoutTeam_rolesInput, teamsUncheckedCreateWithoutTeam_rolesInput>
    where?: teamsWhereInput
  }

  export type teamsUpdateToOneWithWhereWithoutTeam_rolesInput = {
    where?: teamsWhereInput
    data: XOR<teamsUpdateWithoutTeam_rolesInput, teamsUncheckedUpdateWithoutTeam_rolesInput>
  }

  export type teamsUpdateWithoutTeam_rolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    discord_users_teams_created_byTodiscord_users?: discord_usersUpdateOneWithoutTeams_teams_created_byTodiscord_usersNestedInput
    discord_users_teams_ownerTodiscord_users?: discord_usersUpdateOneWithoutTeams_teams_ownerTodiscord_usersNestedInput
  }

  export type teamsUncheckedUpdateWithoutTeam_rolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type discord_usersUpsertWithoutTeam_rolesInput = {
    update: XOR<discord_usersUpdateWithoutTeam_rolesInput, discord_usersUncheckedUpdateWithoutTeam_rolesInput>
    create: XOR<discord_usersCreateWithoutTeam_rolesInput, discord_usersUncheckedCreateWithoutTeam_rolesInput>
    where?: discord_usersWhereInput
  }

  export type discord_usersUpdateToOneWithWhereWithoutTeam_rolesInput = {
    where?: discord_usersWhereInput
    data: XOR<discord_usersUpdateWithoutTeam_rolesInput, discord_usersUncheckedUpdateWithoutTeam_rolesInput>
  }

  export type discord_usersUpdateWithoutTeam_rolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
    teams_teams_created_byTodiscord_users?: teamsUpdateManyWithoutDiscord_users_teams_created_byTodiscord_usersNestedInput
    teams_teams_ownerTodiscord_users?: teamsUpdateManyWithoutDiscord_users_teams_ownerTodiscord_usersNestedInput
  }

  export type discord_usersUncheckedUpdateWithoutTeam_rolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
    teams_teams_created_byTodiscord_users?: teamsUncheckedUpdateManyWithoutDiscord_users_teams_created_byTodiscord_usersNestedInput
    teams_teams_ownerTodiscord_users?: teamsUncheckedUpdateManyWithoutDiscord_users_teams_ownerTodiscord_usersNestedInput
  }

  export type team_rolesCreateWithoutTeamsInput = {
    created_at?: Date | string
    role?: $Enums.team_role | null
    discord_users: discord_usersCreateNestedOneWithoutTeam_rolesInput
  }

  export type team_rolesUncheckedCreateWithoutTeamsInput = {
    user_id: string
    created_at?: Date | string
    role?: $Enums.team_role | null
  }

  export type team_rolesCreateOrConnectWithoutTeamsInput = {
    where: team_rolesWhereUniqueInput
    create: XOR<team_rolesCreateWithoutTeamsInput, team_rolesUncheckedCreateWithoutTeamsInput>
  }

  export type team_rolesCreateManyTeamsInputEnvelope = {
    data: team_rolesCreateManyTeamsInput | team_rolesCreateManyTeamsInput[]
    skipDuplicates?: boolean
  }

  export type discord_usersCreateWithoutTeams_teams_created_byTodiscord_usersInput = {
    id: string
    created_at?: Date | string
    language?: $Enums.language | null
    team_roles?: team_rolesCreateNestedManyWithoutDiscord_usersInput
    teams_teams_ownerTodiscord_users?: teamsCreateNestedManyWithoutDiscord_users_teams_ownerTodiscord_usersInput
  }

  export type discord_usersUncheckedCreateWithoutTeams_teams_created_byTodiscord_usersInput = {
    id: string
    created_at?: Date | string
    language?: $Enums.language | null
    team_roles?: team_rolesUncheckedCreateNestedManyWithoutDiscord_usersInput
    teams_teams_ownerTodiscord_users?: teamsUncheckedCreateNestedManyWithoutDiscord_users_teams_ownerTodiscord_usersInput
  }

  export type discord_usersCreateOrConnectWithoutTeams_teams_created_byTodiscord_usersInput = {
    where: discord_usersWhereUniqueInput
    create: XOR<discord_usersCreateWithoutTeams_teams_created_byTodiscord_usersInput, discord_usersUncheckedCreateWithoutTeams_teams_created_byTodiscord_usersInput>
  }

  export type discord_usersCreateWithoutTeams_teams_ownerTodiscord_usersInput = {
    id: string
    created_at?: Date | string
    language?: $Enums.language | null
    team_roles?: team_rolesCreateNestedManyWithoutDiscord_usersInput
    teams_teams_created_byTodiscord_users?: teamsCreateNestedManyWithoutDiscord_users_teams_created_byTodiscord_usersInput
  }

  export type discord_usersUncheckedCreateWithoutTeams_teams_ownerTodiscord_usersInput = {
    id: string
    created_at?: Date | string
    language?: $Enums.language | null
    team_roles?: team_rolesUncheckedCreateNestedManyWithoutDiscord_usersInput
    teams_teams_created_byTodiscord_users?: teamsUncheckedCreateNestedManyWithoutDiscord_users_teams_created_byTodiscord_usersInput
  }

  export type discord_usersCreateOrConnectWithoutTeams_teams_ownerTodiscord_usersInput = {
    where: discord_usersWhereUniqueInput
    create: XOR<discord_usersCreateWithoutTeams_teams_ownerTodiscord_usersInput, discord_usersUncheckedCreateWithoutTeams_teams_ownerTodiscord_usersInput>
  }

  export type team_rolesUpsertWithWhereUniqueWithoutTeamsInput = {
    where: team_rolesWhereUniqueInput
    update: XOR<team_rolesUpdateWithoutTeamsInput, team_rolesUncheckedUpdateWithoutTeamsInput>
    create: XOR<team_rolesCreateWithoutTeamsInput, team_rolesUncheckedCreateWithoutTeamsInput>
  }

  export type team_rolesUpdateWithWhereUniqueWithoutTeamsInput = {
    where: team_rolesWhereUniqueInput
    data: XOR<team_rolesUpdateWithoutTeamsInput, team_rolesUncheckedUpdateWithoutTeamsInput>
  }

  export type team_rolesUpdateManyWithWhereWithoutTeamsInput = {
    where: team_rolesScalarWhereInput
    data: XOR<team_rolesUpdateManyMutationInput, team_rolesUncheckedUpdateManyWithoutTeamsInput>
  }

  export type discord_usersUpsertWithoutTeams_teams_created_byTodiscord_usersInput = {
    update: XOR<discord_usersUpdateWithoutTeams_teams_created_byTodiscord_usersInput, discord_usersUncheckedUpdateWithoutTeams_teams_created_byTodiscord_usersInput>
    create: XOR<discord_usersCreateWithoutTeams_teams_created_byTodiscord_usersInput, discord_usersUncheckedCreateWithoutTeams_teams_created_byTodiscord_usersInput>
    where?: discord_usersWhereInput
  }

  export type discord_usersUpdateToOneWithWhereWithoutTeams_teams_created_byTodiscord_usersInput = {
    where?: discord_usersWhereInput
    data: XOR<discord_usersUpdateWithoutTeams_teams_created_byTodiscord_usersInput, discord_usersUncheckedUpdateWithoutTeams_teams_created_byTodiscord_usersInput>
  }

  export type discord_usersUpdateWithoutTeams_teams_created_byTodiscord_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
    team_roles?: team_rolesUpdateManyWithoutDiscord_usersNestedInput
    teams_teams_ownerTodiscord_users?: teamsUpdateManyWithoutDiscord_users_teams_ownerTodiscord_usersNestedInput
  }

  export type discord_usersUncheckedUpdateWithoutTeams_teams_created_byTodiscord_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
    team_roles?: team_rolesUncheckedUpdateManyWithoutDiscord_usersNestedInput
    teams_teams_ownerTodiscord_users?: teamsUncheckedUpdateManyWithoutDiscord_users_teams_ownerTodiscord_usersNestedInput
  }

  export type discord_usersUpsertWithoutTeams_teams_ownerTodiscord_usersInput = {
    update: XOR<discord_usersUpdateWithoutTeams_teams_ownerTodiscord_usersInput, discord_usersUncheckedUpdateWithoutTeams_teams_ownerTodiscord_usersInput>
    create: XOR<discord_usersCreateWithoutTeams_teams_ownerTodiscord_usersInput, discord_usersUncheckedCreateWithoutTeams_teams_ownerTodiscord_usersInput>
    where?: discord_usersWhereInput
  }

  export type discord_usersUpdateToOneWithWhereWithoutTeams_teams_ownerTodiscord_usersInput = {
    where?: discord_usersWhereInput
    data: XOR<discord_usersUpdateWithoutTeams_teams_ownerTodiscord_usersInput, discord_usersUncheckedUpdateWithoutTeams_teams_ownerTodiscord_usersInput>
  }

  export type discord_usersUpdateWithoutTeams_teams_ownerTodiscord_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
    team_roles?: team_rolesUpdateManyWithoutDiscord_usersNestedInput
    teams_teams_created_byTodiscord_users?: teamsUpdateManyWithoutDiscord_users_teams_created_byTodiscord_usersNestedInput
  }

  export type discord_usersUncheckedUpdateWithoutTeams_teams_ownerTodiscord_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableEnumlanguageFieldUpdateOperationsInput | $Enums.language | null
    team_roles?: team_rolesUncheckedUpdateManyWithoutDiscord_usersNestedInput
    teams_teams_created_byTodiscord_users?: teamsUncheckedUpdateManyWithoutDiscord_users_teams_created_byTodiscord_usersNestedInput
  }

  export type team_rolesCreateManyDiscord_usersInput = {
    team_id: string
    created_at?: Date | string
    role?: $Enums.team_role | null
  }

  export type teamsCreateManyDiscord_users_teams_created_byTodiscord_usersInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    owner?: string | null
  }

  export type teamsCreateManyDiscord_users_teams_ownerTodiscord_usersInput = {
    id?: string
    name: string
    short_name: string
    created_at?: Date | string
    created_by?: string | null
  }

  export type team_rolesUpdateWithoutDiscord_usersInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableEnumteam_roleFieldUpdateOperationsInput | $Enums.team_role | null
    teams?: teamsUpdateOneRequiredWithoutTeam_rolesNestedInput
  }

  export type team_rolesUncheckedUpdateWithoutDiscord_usersInput = {
    team_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableEnumteam_roleFieldUpdateOperationsInput | $Enums.team_role | null
  }

  export type team_rolesUncheckedUpdateManyWithoutDiscord_usersInput = {
    team_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableEnumteam_roleFieldUpdateOperationsInput | $Enums.team_role | null
  }

  export type teamsUpdateWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    team_roles?: team_rolesUpdateManyWithoutTeamsNestedInput
    discord_users_teams_ownerTodiscord_users?: discord_usersUpdateOneWithoutTeams_teams_ownerTodiscord_usersNestedInput
  }

  export type teamsUncheckedUpdateWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    team_roles?: team_rolesUncheckedUpdateManyWithoutTeamsNestedInput
  }

  export type teamsUncheckedUpdateManyWithoutDiscord_users_teams_created_byTodiscord_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type teamsUpdateWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    team_roles?: team_rolesUpdateManyWithoutTeamsNestedInput
    discord_users_teams_created_byTodiscord_users?: discord_usersUpdateOneWithoutTeams_teams_created_byTodiscord_usersNestedInput
  }

  export type teamsUncheckedUpdateWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    team_roles?: team_rolesUncheckedUpdateManyWithoutTeamsNestedInput
  }

  export type teamsUncheckedUpdateManyWithoutDiscord_users_teams_ownerTodiscord_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    short_name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type team_rolesCreateManyTeamsInput = {
    user_id: string
    created_at?: Date | string
    role?: $Enums.team_role | null
  }

  export type team_rolesUpdateWithoutTeamsInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableEnumteam_roleFieldUpdateOperationsInput | $Enums.team_role | null
    discord_users?: discord_usersUpdateOneRequiredWithoutTeam_rolesNestedInput
  }

  export type team_rolesUncheckedUpdateWithoutTeamsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableEnumteam_roleFieldUpdateOperationsInput | $Enums.team_role | null
  }

  export type team_rolesUncheckedUpdateManyWithoutTeamsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: NullableEnumteam_roleFieldUpdateOperationsInput | $Enums.team_role | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}