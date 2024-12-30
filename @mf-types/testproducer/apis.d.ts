
    export type RemoteKeys = 'testproducer/TestReact';
    type PackageType<T> = T extends 'testproducer/TestReact' ? typeof import('testproducer/TestReact') :any;