import { BaseObject } from '@app/model/base-object';
import { Optional } from '@app/util';

type Props = {
  [key: string]: any;
};

export class Model<T extends Props> extends BaseObject<T> {
  public setId(id: T['id']) {
    return this.setProps({ id } as any);
  }

  public getId(required: true): Required<T>['id'] extends Optional<infer K> ? K : Required<T>['id'];
  public getId(): T['id'];
  public getId(required?: true): any {
    if (required && !this.props.id) {
      throw new Error(`empty ${this.constructor.name}.id`);
    }

    return this.props.id;
  }
}
